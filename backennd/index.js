const express=require('express');
const cors =require('cors');
const puppeteer = require('puppeteer');
const app=express();
app.use(express.json());
app.use(cors({
  origin:['http://localhost:5173']
}));
app.use('/search',async(req,res)=>{
    const {query}=req.body;
    console.log(query);
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${query}`,{ timeout: 100000});
    console.log(page);
    const divElement = await page.$('.top-pla-group-inner');
    if(divElement!=null){
      const data = await page.evaluate(() => {
        const parentDiv = document.querySelector('.top-pla-group-inner'); // Adjust the selector
        if (parentDiv) {
          const firstChildDiv = parentDiv.querySelector('.mnr-c'); 
          if (firstChildDiv) {
            const val=firstChildDiv.querySelectorAll('img');
            const arr=[];
            for(let i=0;i<val.length;i++){
              if(val[i].src!=""){
                arr.push(val[i].src);}
            }
            return {des:firstChildDiv.querySelector('.pymv4e' ).textContent,img:arr,
            price:firstChildDiv.querySelector('.T4OwTb').textContent};
          }
        }
        return null;
      });
      return res.send(data);
    }
    const divElementt = await page.$('.Yi78Pd');
    if(divElementt!=null){
      const data = await page.evaluate(() => {
        const parentDiv = document.querySelector('.Yi78Pd'); // Adjust the selector
        if (parentDiv) {
          const firstChildDiv = parentDiv.querySelector('.mnr-c'); 
          if (firstChildDiv) {
            const val=firstChildDiv.querySelectorAll('img');
            const arr=[];
            for(let i=0;i<val.length;i++){
              if(val[i].src!=""){
              arr.push(val[i].src);}
            }
            return {des:firstChildDiv.querySelector('.pymv4e' ).textContent,img:arr,
            price:firstChildDiv.querySelector('.T4OwTb').textContent};
          }
        }
        return null;
      });
      return res.send(data);
    }
    return res.send("Not Found");
});
app.listen(5000,()=>{console.log('Listening...');})