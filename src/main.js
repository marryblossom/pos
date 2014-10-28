/*
The process of printInventory:
First: delete the reduplicative item's barcode in the input 
Second: Iterate the input to calculate the number and subtotal of every different item.
Third: Calculate the total prices and the preferential price
Forth: Append strings to output
*/
//main method in main.js     It output the result
function printInventory(input){
	var total = 0;
	var simple = sameDelete(input);
	var single='***<没钱赚商店>购物清单***\n';
	var seg = '----------------------\n';
	var give = '';                                          //preferential product
	var save = 0;                                           //preferential price
	for(var i=0;i<simple.length;i++){
	   var pro = getObject(simple[i]);
	   var num = getNum(simple[i],input);
	   var subTotal = calculate(pro.barcode,pro.price,num);
	   total += parseFloat(subTotal);
	   single += '名称：'+pro.name+'，数量：'+num+pro.unit+'，单价：'+pro.price+'(元)，小计：'+subTotal+'(元)\n';
	
	   if(isPrivi(simple[i])){
		give +='名称：'+pro.name+'，数量：1'+pro.unit+'\n';
		save +=parseFloat(pro.price);
		}
	}
	single += seg+'挥泪赠送商品：\n'+give+seg;
	var submit = single+'总计：'+total.toFixed(2)+'(元)\n'+'节省：'+save.toFixed(2)+'(元)\n**********************';
	console.log(submit);

}
// map to a object     get all items from fixtures.js
function getObject(barcode){
	var allItems;
	allItems = loadAllItems();
	var bar = barcode;
	for(var i=0;i<allItems.length;i++){
	   if(equal(bar,(allItems[i].barcode))){
	   	return {
		   barcode:allItems[i].barcode,
            	   name:allItems[i].name,
            	   unit:allItems[i].unit,
            	   price:allItems[i].price.toFixed(2)	
		}
	   }
	}	
}
// If the product has privilege 
function isPrivi(barcode){
	var bar = barcode;
	var allPrivi = loadPromotions();
	var barcodes = allPrivi[0].barcodes;
	for(var i=0;i<barcodes.length;i++){
	   if(equal(bar,barcodes[i])){
		return true;
		}
	}
	return false;
}
//  get bought number
function getNum(str,input){
	var num = 0;
	for(var i=0;i<input.length;i++){
	   if(equal(input[i],str))
	    num += dealString(input[i]);
	}
	return num;
}
//calculate method
function calculate(barcode,price,num){
	if(isPrivi(barcode))
	   return (price*(Math.floor(num/2))*2).toFixed(2);
	else
	   return (price*num).toFixed(2);
}

/*
  util method
*/
// if two string equal or string1 can be found in string2
function equal(str1,str2){
	if(str1.search(str2)==-1)
	   return false;
	else 
	   return true;
}
// delete the reduplicative items from input
function sameDelete(input){
	var index = 0;
	var array = new Array;
	var x = input[0];
	array.push(x);
	while(index<input.length){
	   var simple = input[index];
	   if(!equal(x,simple)){
		if(equal(simple,'-')){
		   var ss = simple.split("-");
		   array.push(ss[0]);
		}else{
		   array.push(input[index]);
		}
		x = simple;
	   }
	  index++;
	}
	return array;
}
//analysis the string    return the 'barcode' of every item without bought number
function dealString(str){
	if(equal(str,'-')){
	   var ss = str.split("-");
	   return parseInt(ss[1]);
	}else{
	   return 1;	
	}
}
