import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gift, GiftDocument } from './schemas/gift.schema';

@Injectable()
export class GiftService {
  constructor(@InjectModel(Gift.name) private giftModel: Model<GiftDocument>) {}

  async findAll() {
    return this.giftModel.find().exec();
  }

  async findOne(id: string) {
    const gift = await this.giftModel.findById(id).exec();
    if (!gift) throw new NotFoundException('Gift not found');
    return gift;
  }

  async create(data: Partial<Gift>) {
    const newGift = new this.giftModel(data);
    return newGift.save();
  }

  async update(id: string, updates: Partial<Gift>) {
    return this.giftModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }
}
