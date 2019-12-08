import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "sortDscBy"
})
@Injectable()
export class SortDscPipe {
  transform(array: Array<string>, args: string): Array<string> {
    //console.log("array: ", array);
    array.sort((a: any, b: any) => {
	    if ( a[args] > b[args] ){
	    	return -1;
	    }else if( a[args] < b[args] ){
	        return 1;
	    }else{
	    	return 0;	
	    }
    });
    return array;
  }
}