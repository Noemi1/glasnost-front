
import { HttpErrorResponse } from "@angular/common/http";

export function getError(res: HttpErrorResponse) {
var msg = "Ocorreu um erro, mas não foi possível localizar a causa.";
    res = ConvertKeysToLowerCase(res) as HttpErrorResponse;

    if (res) {
        if (res.error && res.error.message) {
            msg = res.error.message;
        }
        else if (res.error && res.error.title)
        {
            msg = res.error.title;
        }
        else if (res.error && res.error.innerexception && res.error.innerexception.innerexception){
            msg = res.error.InnerException.InnerException;
        }
        
        else if (res.error && res.error.innerexception && res.error.innerexception.message) {
            msg = res.error.InnerException.Message;
        }
        
        else if (res.error && typeof res.error == 'string') {
            msg = res.error;
        }
        
        else if (res.error && res.error.innerexception) {
            msg = res.error.innerexception;
        }
        
        else if (res.message) {
            msg = res.message;
        }
        
        else if (res.error.error) {
            msg = res.error.error;
        }
    
        else if (res.error) {
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
  