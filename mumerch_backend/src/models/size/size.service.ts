import { Injectable } from '@nestjs/common';
import { SizeDTO } from './size.dto';
import { Console } from 'console';


@Injectable()
export class SizeService {

  getSize(): SizeDTO {
    return {id:"100",name:"M",updatedBy:"elahi"};
  }

  getSizeByName(name: string): SizeDTO{
    console.log(name)
    return {id:"100",name:"XL",updatedBy:"elahi"};
  }

  updateSize(data: SizeDTO): string{
    return data.name;
  }

  deleteSize(id: string): string{
    console.log(id)
    return "-- deleted";
  }

  addSize(data: SizeDTO): string{
    return data.name;
  }
}