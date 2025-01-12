export const createReadableUrl=(name)=>{
    const namee=name.toString();
   const format= namee.replace(/[^a-zA-Z0-9]/g,"-" );
   //console.log("format",format)
   return format;
}