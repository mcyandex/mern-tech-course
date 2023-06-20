import { Injectable } from "@nestjs/common";
import { ColorDTO } from "./color.dto";
import { Console } from 'console';

@Injectable()
export class ColorService{

    getColor(): ColorDTO {
        return {id:"1",name:"Orange",updatedBy:"aneen", updatedAt:"1:00am"};
      }
    
    
      updateColor(data: ColorDTO): string{
        return data.name;
      }
    
      deleteColor(id: string): string{
        console.log(id)
        return "deleted";
      }
    
      addColor(data: ColorDTO): string{
        return data.name;
      }
}