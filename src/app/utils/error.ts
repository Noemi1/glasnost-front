
import { HttpErrorResponse } from "@angular/common/http";

export function getError(res: HttpErrorResponse) {
var msg = "Ocorreu um erro, mas não foi possível localizar a causa.";
                    console.log('msg', msg);

    res = ConvertKeysToLowerCase(res) as HttpErrorResponse;

    console.log('res', res, res.error.errors);
    if (res) {
        console.log('res if');
        if (res.error && res.error.message) {
            msg = res.error.message;
            console.log('1');
        }
        else if (res.error && res.error.title)
        {
            console.log('2');
            msg = res.error.title;
        }
        else if (res.error && res.error.innerexception && res.error.innerexception.innerexception){
            console.log('3');
            msg = res.error.InnerException.InnerException;
        }
        
        else if (res.error && res.error.innerexception && res.error.innerexception.message) {
            console.log('4');
            msg = res.error.InnerException.Message;
        }
        
        else if (res.error && typeof res.error == 'string') {
            console.log('5');

            msg = res.error;
        }
        
        else if (res.error && res.error.innerexception) {
            console.log('6');

            msg = res.error.innerexception;
        }
        
        else if (res.message) {
            console.log('7');

            msg = res.message;
        }
        
        else if (res.error.error) {
            console.log('8');

            msg = res.error.error;
        }
    
        else if (res.error) {
            console.log('9');

            msg = res.error;
        }
        
        else
            msg = "Ocorreu um erro no processamento da requisição.";
            
    }
    return msg
}

function jsonKeyToLowercase(oldObj: any) {
    var keysUpper = Object.keys(oldObj)
    var newObj: any = {}
    for(var i in keysUpper){
        newObj[keysUpper[i].toLowerCase()] = oldObj[keysUpper[i]]
    }
    return newObj;
}

  
  function ConvertKeysToLowerCase(obj: any) {
      if (Object.prototype.toString.apply(obj) !== '[object Array]' && Object.prototype.toString.apply(obj) !== '[object Object]') {
          return obj;
      }
      let output: any = {};
      for (let i in obj) {
          if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
             output[i.toLowerCase()] = ConvertKeysToLowerCase(obj[i]);
          } else if(Object.prototype.toString.apply(obj[i]) === '[object Array]'){
              output[i.toLowerCase()]=[];
              for (let j = 0; j < obj[i].length; j++) {
                  output[i.toLowerCase()].push(ConvertKeysToLowerCase(obj[i][j]));
              }
          } else {
              output[i.toLowerCase()] = obj[i];
          }
      }
      return output;
  };
  