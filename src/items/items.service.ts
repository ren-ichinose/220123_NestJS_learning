import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from 'src/items/dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
    constructor(private readonly itemRepository: ItemRepository){}
    private items: Item[] = [];
    async findAll(): Promise<Item[]>{
        return await this.itemRepository.find();
    }
    async findById(id: string): Promise<Item>{
        const found = await this.itemRepository.findOne(id);
        if(!found) {
            throw new NotFoundException();
        }
        return found; 
    }
    async create(CreateItemDto: CreateItemDto): Promise<Item> {
        return await this.itemRepository.createItem(CreateItemDto);
    }
    async updateStatus(id: string): Promise<Item>{
        const item = await this.findById(id);
        item.status = ItemStatus.SOLD_OUT;
        item.updatedaAt = new Date().toISOString();
        await this.itemRepository.save(item);
        return item;
    }
    async deleat(id: string): Promise<void>{
        await this.itemRepository.delete(id);
    }
}
