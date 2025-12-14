import { DynamicModule, Module } from '@nestjs/common';
import { NodeOption, OptionalOptions } from 'shoukaku';
import { SHOUKAKU_OPTIONS } from './shoukaku.constants';
import { ShoukakuService } from './shoukaku.service';

export interface ShoukakuModuleOptions {
  nodes: NodeOption[];
  options?: OptionalOptions;
}

@Module({})
export class ShoukakuModule {
  static forRootAsync(options: {
    imports?: any[];
    inject?: any[];
    useFactory: (
      ...args: any[]
    ) => Promise<ShoukakuModuleOptions> | ShoukakuModuleOptions;
  }): DynamicModule {
    return {
      module: ShoukakuModule,
      imports: options.imports || [],
      providers: [
        {
          provide: SHOUKAKU_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        ShoukakuService,
      ],
      exports: [ShoukakuService],
    };
  }

  static forRoot(options: ShoukakuModuleOptions): DynamicModule {
    return {
      module: ShoukakuModule,
      providers: [
        {
          provide: SHOUKAKU_OPTIONS,
          useValue: options,
        },
        ShoukakuService,
      ],
      exports: [ShoukakuService],
    };
  }
}
