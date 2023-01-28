import { faker } from '@faker-js/faker';
import {
  AVAILABLE_GUITAR_TYPE,
  AVAILABLE_STRINGS_NUMBERS,
  CliCommand,
  Command,
  Product,
  UserRole,
} from '@guitar-shop/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nanoid from 'nanoid';
import { copyFile, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import {
  AppOption,
  ConfigNamespace,
  MulterOption,
  StaticOption,
} from '../app.constant';
import { ProductEntity } from '../product/product.entity';
import { ProductRepository } from '../product/product.repository';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

const { Multer, Static, App } = ConfigNamespace;
const { Storage } = MulterOption;
const { StaticDirectory } = StaticOption;
const { Host, Port } = AppOption;

@Injectable()
export class GenerateCommand implements CliCommand {
  readonly name: Command.Generate;
  private contentImages: string[];
  private host: string;
  private port: number;
  private staticFolder: string;
  private uploadFolder: string;
  private imagesFolder: string;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
    private readonly configService: ConfigService
  ) {
    this.imagesFolder = join('markup', 'img', 'content');
    this.host = this.configService.get<string>(`${App}.${Host}`);
    this.port = this.configService.get<number>(`${App}.${Port}`);
    this.staticFolder = this.configService.get<string>(
      `${Static}.${StaticDirectory}`
    );
    this.uploadFolder = this.configService.get<string>(`${Multer}.${Storage}`);
  }

  async run(param: number | boolean) {
    this.contentImages = await (
      await readdir(join('markup', 'img', 'content'))
    ).filter((image) => /catalog.+\w+.+2x/.test(image) && image);
    const count = param !== true ? param : 10;
    const mocks = this.createProducts(count);
    await this.insertMocks(mocks);
  }

  private async insertMocks(mocks: Product[]) {
    await this.insertAdmin();
    for (let i = 0; i < mocks.length; i++) {
      await this.insertProduct(mocks[i]);
    }
  }

  private async insertAdmin() {
    const admin = await new UserEntity({
      userName: 'admin',
      email: 'admin@admin.local',
      role: UserRole.Admin,
    }).setPassword('admin');

    await this.userRepository.create(admin);
    console.log('Admin insert');
  }

  private async insertProduct(mock: Product) {
    const photo = await this.getPhoto();
    const productEntity = new ProductEntity({
      ...mock,
      photo: `http://${this.host}:${this.port}/${photo}`,
    });

    await this.productRepository.create(productEntity);
    console.log('Product insert');
  }

  private createProducts(count) {
    return Array.from({ length: count }, () => ({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      article: faker.finance.pin(6),
      guitarType: faker.helpers.arrayElement(AVAILABLE_GUITAR_TYPE),
      stringsNumber: faker.helpers.arrayElement(AVAILABLE_STRINGS_NUMBERS),
      price: +faker.commerce.price(100, 1_000_000, 2),
    }));
  }

  private async getPhoto() {
    const image = faker.helpers.arrayElement(this.contentImages);
    const uploadImageName = `${nanoid()}${extname(image)}`;

    const imagePath = join(this.imagesFolder, image);
    const photoPath = join(
      this.staticFolder,
      this.uploadFolder,
      uploadImageName
    );

    await copyFile(imagePath, photoPath);
    return uploadImageName;
  }
}
