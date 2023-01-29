import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateItemDto } from 'src/items/dto/create-item.dto';
import { Item } from '../entities/item.entity';
import { ItemsService } from './items.service';


@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService){}
    @Get()
    async findAll(): Promise<Item[]> {
        return await this.itemsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item>{
        return await this.itemsService.findById(id); 
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() CreateItemDto: CreateItemDto): Promise<Item>  {
        return await this.itemsService.create(CreateItemDto);
    }
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemsService.updateStatus(id);
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleat(@Param('id', ParseUUIDPipe) id: string): Promise<void>{
        await this.itemsService.deleat(id);
    }
}
