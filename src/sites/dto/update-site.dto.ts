import { PartialType } from '@nestjs/mapped-types';

import { CreateSiteDto } from './create-site.dto';

export class UpdateSiteDto extends PartialType(CreateSiteDto) {
    readonly name: string;
    readonly address: string;
    readonly description: string;
}
