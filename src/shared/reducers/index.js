const counter = (state = 0, action) =>{
     switch (action.type){
          case 'VISIT':
               return state + 1;
          default:
               return state;
     }
}
