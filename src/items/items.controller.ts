import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateItemDto } from 'src/dto/create-item.dto';
import { Item } from './items.model';
import { ItemsService } from './items.service';


@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService){}
    @Get()
    findAll(): Item[] {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseUUIDPipe) id: string): Item{
        return this.itemsService.findById(id); 
    }

    @Post()
    create(@Body() CreateItemDto: CreateItemDto): Item {
        return this.itemsService.create(CreateItemDto);
    }
    @Patch(':id')
    updateStatus(@Param('id', ParseUUIDPipe) id: string): Item {
        return this.itemsService.updateStatus(id);
    }
    @Delete(':id')
    deleat(@Param('id', ParseUUIDPipe) id: string): void {
        this.itemsService.deleat(id);
    }
}
