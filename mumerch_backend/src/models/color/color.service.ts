import { Injectable } from "@nestjs/common";
import { ColorDTO } from "./color.dto";
import { Console } from 'console';

@Injectable()
export class ColorService{
    getColor(): ColorDTO {
        return {id:"1",name:"Orange",updatedBy:"aneen", updatedAt:"1:00am"};
      }
    
    
      updateSize(data: ColorDTO): string{
        return data.name;
      }
    
      deleteSize(id: string): string{
        console.log(id)
        return "deleted";
      }
    
      addSize(data: ColorDTO): string{
        return data.name;
      }
}