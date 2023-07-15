export let WIDTH =window.innerWidth/2;
export let ratio = 9/12;
export let HEIGHT = ratio*WIDTH;

export function toInvertScale(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    for(let i=0;i<imageData.data.length;i+=4){
        let r = imageData.data[i]
        let g = imageData.data[i+1]
        let b = imageData.data[i+2]
        
        imageData.data[i] = 255-r
        imageData.data[i+1] = 255-g
        imageData.data[i+2] = 255-b
    }
    ctx.putImageData(imageData,0,0)
}

export function toGrayScale(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    for(let i=0;i<imageData.data.length;i+=4){
        let r = imageData.data[i]
        let g = imageData.data[i+1]
        let b = imageData.data[i+2]

        imageData.data[i] = (r+g+b)/3
        imageData.data[i+1] = (r+g+b)/3
        imageData.data[i+2] = (r+g+b)/3
    }
    ctx.putImageData(imageData,0,0)
}

export function leftMirror(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    for(let y=0;y<imageData.height;y++){
        for(let x=0;x<imageData.width/2;x++){
            let pixel = getPixel(imageData,imageData.width-x,y)
            imageData.data[(y*imageData.width+x)*4]=pixel.r
            imageData.data[(y*imageData.width+x)*4+1]=pixel.g
            imageData.data[(y*imageData.width+x)*4+2]=pixel.b
            imageData.data[(y*imageData.width+x)*4+3]=pixel.a
        }
    }
    ctx.putImageData(imageData,0,0)
}

export function righMirror(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    for(let j=0;j<imageData.height;j++){
        for(let i=imageData.width/2;i<imageData.width;i++){
            let pixel = getPixel(imageData,imageData.width - i,j)
            imageData.data[(j*imageData.width+i)*4+0] = pixel.r
            imageData.data[(j*imageData.width+i)*4+1] = pixel.g
            imageData.data[(j*imageData.width+i)*4+2] = pixel.b
            imageData.data[(j*imageData.width+i)*4+3] = pixel.a
        }
    }
    ctx.putImageData(imageData,0,0)
}

export function bottomMirror(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    for(let j=0;j<imageData.height/2;j++){
        for(let i=0;i<imageData.width;i++){
            let pixel = getPixel(imageData,i,imageData.height - j)
            imageData.data[(j*imageData.width+i)*4+0] = pixel.r
            imageData.data[(j*imageData.width+i)*4+1] = pixel.g
            imageData.data[(j*imageData.width+i)*4+2] = pixel.b
            imageData.data[(j*imageData.width+i)*4+3] = pixel.a
        }
    }
    ctx.putImageData(imageData,0,0)
}

export function topMirror(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    for(let j=imageData.height/2;j<imageData.height;j++){
        for(let i=0;i<imageData.width;i++){
            let pixel = getPixel(imageData,i,imageData.height - j)
            imageData.data[(j*imageData.width+i)*4+0] = pixel.r
            imageData.data[(j*imageData.width+i)*4+1] = pixel.g
            imageData.data[(j*imageData.width+i)*4+2] = pixel.b
            imageData.data[(j*imageData.width+i)*4+3] = pixel.a
        }
    }
    ctx.putImageData(imageData,0,0)
}

export function getPixel(imageData,x,y){
    return{
        r:imageData.data[(y*imageData.width+x)*4+0],
        g:imageData.data[(y*imageData.width+x)*4+1],
        b:imageData.data[(y*imageData.width+x)*4+2],
        a:imageData.data[(y*imageData.width+x)*4+3],
    }
}

export function brightness(ctx,adjustment,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    for(let i=0;i<imageData.data.length;i+=4){
        imageData.data[i] += adjustment
        imageData.data[i+1] += adjustment
        imageData.data[i+2] += adjustment
    }
    ctx.putImageData(imageData,0,0)
}

export function toGridView(ctx,rows=2,columns=2,width=WIDTH,height=HEIGHT){
    let canvas = document.createElement("canvas")
    canvas.width = width/columns;
    canvas.height = height/rows;
    let newCtx = canvas.getContext("2d")
    newCtx.drawImage(ctx.canvas,0,0,canvas.width,canvas.height)
    ctx.clearRect(0,0,width,height)
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            ctx.drawImage(canvas,width*j/columns,i*height/rows)
        }
    }
}

export function redScale(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    for(let i=0;i<imageData.data.length;i+=4){
       imageData.data[i] += 0
       imageData.data[i+1] = 0
       imageData.data[i+2] = 0
    }
    ctx.putImageData(imageData,0,0)
}

export function blueScale(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    for(let i=0;i<imageData.data.length;i+=4){
       imageData.data[i] = 0
       imageData.data[i+1] = 0
       imageData.data[i+2] += 0
    }
    ctx.putImageData(imageData,0,0)
}

export function greenScale(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    for(let i=0;i<imageData.data.length;i+=4){
       imageData.data[i] = 0
       imageData.data[i+1] += 0
       imageData.data[i+2] = 0
    }
    ctx.putImageData(imageData,0,0)
}

export function blackAndWhite(ctx,threshold,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    for(let i=0;i<imageData.data.length;i+=4){
       let r = imageData.data[i] 
       let g = imageData.data[i+1] 
       let b = imageData.data[i+2] 
       const v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
       imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] = v  
    }
    ctx.putImageData(imageData,0,0)
}

export function mirrorImage(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    let newData = ctx.createImageData(width,height)
    for(let y=0;y<imageData.height;y++){
        for(let x=0;x<imageData.width;x++){
            let pixel = getPixel(imageData,imageData.width - x,y)
            newData.data[(y*imageData.width+x)*4] = pixel.r
            newData.data[(y*imageData.width+x)*4+1] = pixel.g
            newData.data[(y*imageData.width+x)*4+2] = pixel.b
            newData.data[(y*imageData.width+x)*4+3] = pixel.a
        }
    }
    ctx.putImageData(newData,0,0)
}

export function upsideDown(ctx ,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    let newData = ctx.createImageData(width,height)
    for(let y=0;y<imageData.height;y++){
        for(let x=0;x<imageData.width;x++){
            let pixel = getPixel(imageData,x,imageData.height - y)
            newData.data[(y*imageData.width+x)*4] = pixel.r
            newData.data[(y*imageData.width+x)*4+1] = pixel.g
            newData.data[(y*imageData.width+x)*4+2] = pixel.b
            newData.data[(y*imageData.width+x)*4+3] = pixel.a
        }
    }
    ctx.putImageData(newData,0,0)

}
export function switchHorizontal(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    let newData  =ctx.createImageData(width,height)
    for(let y=0;y<imageData.height;y++){
        for(let x=0;x<imageData.width;x++){
            if(y>imageData.height/2){
                let pixel = getPixel(imageData,imageData.width - x,y)
                newData.data[(y*imageData.width+x)*4] = pixel.r
                newData.data[(y*imageData.width+x)*4+1] = pixel.g
                newData.data[(y*imageData.width+x)*4+2] = pixel.b
                newData.data[(y*imageData.width+x)*4+3] = pixel.a
            }
            else{
                let pixel = getPixel(imageData,x,y)
                newData.data[(y*imageData.width+x)*4] = pixel.r
                newData.data[(y*imageData.width+x)*4+1] = pixel.g
                newData.data[(y*imageData.width+x)*4+2] = pixel.b
                newData.data[(y*imageData.width+x)*4+3] = pixel.a
            }
        }
    }
    ctx.putImageData(newData,0,0)
}

export function switchVertical(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    let newData  =ctx.createImageData(width,height)
    for(let i=0;i<imageData.height;i++){
        for(let j=0;j<imageData.width;j++){
            if(j>=imageData.width/2){
                let pixel = getPixel(imageData,j,imageData.height - i)
                newData.data[(i*imageData.width+j)*4] = pixel.r
                newData.data[(i*imageData.width+j)*4+1] = pixel.g
                newData.data[(i*imageData.width+j)*4+2] = pixel.b
                newData.data[(i*imageData.width+j)*4+3] = pixel.a
            }else{
                let pixel = getPixel(imageData,j,i)
                newData.data[(i*imageData.width+j)*4] = pixel.r
                newData.data[(i*imageData.width+j)*4+1] = pixel.g
                newData.data[(i*imageData.width+j)*4+2] = pixel.b
                newData.data[(i*imageData.width+j)*4+3] = pixel.a
            }
        }
    }
    ctx.putImageData(newData,0,0)
}

export function quadMirror(ctx,width=WIDTH,height=HEIGHT){
    mirrorImage(ctx)
    let canvas = document.createElement("canvas")
    canvas.width = width/2;
    canvas.height = height/2;
    let newCtx = canvas.getContext("2d")
    newCtx.drawImage(ctx.canvas,0,0,canvas.width,canvas.height)
    ctx.clearRect(0,0,width,height)
    ctx.drawImage(canvas,0,height/2,canvas.width,canvas.height)
    mirrorImage(newCtx,canvas.width,canvas.height)
    ctx.drawImage(canvas,width/2,height/2,canvas.width,canvas.height)
    canvas.width = width
    newCtx.putImageData(ctx.getImageData(0,height/2,width,height),0,0)
    upsideDown(newCtx,canvas.width,canvas.height)
    ctx.drawImage(canvas,0,0,canvas.width,canvas.height)
}

function RGBToHSV(rgb){
    let rPrime = rgb.r/255
    let gPrime = rgb.g/255
    let bPrime = rgb.b/255
    let cMax = Math.max(rPrime,gPrime,bPrime)
    let cMin = Math.min(rPrime,gPrime,bPrime)
    let delta = cMax-cMin
    let h,s,v=(cMin+cMax)/2
    if(delta==0){
        h=0
    }
    else if(delta==rPrime){
        h=60*((gPrime-bPrime/delta)%6)
    }
    else if(delta==gPrime){
        h=60*((bPrime-rPrime)/delta+2)
    }
    else if(delta==bPrime){
        h=60*((rPrime-gPrime)/delta+4)
    }

    if(cMax==0){
        s=0
    }else{
        s=delta/cMax
    }
    return {h:h*255,s:s*255,v:v}
}

function bitwiseOROperator(img1,img2,width=WIDTH,height=HEIGHT){
    let newData =  new ImageData(width,height)
    for(let i=0;i<newData.height;i++){
        for(let j=0;j<newData.width;j++){
            newData.data[(i*newData.width+j)*4] = img1.data[(i*newData.width+j)*4] | img2.data[(i*newData.width+j)*4]
            newData.data[(i*newData.width+j)*4+1] = img1.data[(i*newData.width+j)*4+1] | img2.data[(i*newData.width+j)*4+1]
            newData.data[(i*newData.width+j)*4+2] = img1.data[(i*newData.width+j)*4+2] | img2.data[(i*newData.width+j)*4+2]
            newData.data[(i*newData.width+j)*4+3] = img1.data[(i*newData.width+j)*4+3] | img2.data[(i*newData.width+j)*4+3]
        }
    }
    return newData
}

function bitwiseANDOperator(img1,img2,width=WIDTH,height=HEIGHT){
    let newData =  new ImageData(width,height)
    for(let i=0;i<newData.height;i++){
        for(let j=0;j<newData.width;j++){
            newData.data[(i*newData.width+j)*4] = img1.data[(i*newData.width+j)*4] & img2.data[(i*newData.width+j)*4]
            newData.data[(i*newData.width+j)*4+1] = img1.data[(i*newData.width+j)*4+1] & img2.data[(i*newData.width+j)*4+1]
            newData.data[(i*newData.width+j)*4+2] = img1.data[(i*newData.width+j)*4+2] & img2.data[(i*newData.width+j)*4+2]
            newData.data[(i*newData.width+j)*4+3] = img1.data[(i*newData.width+j)*4+3] & img2.data[(i*newData.width+j)*4+3]
        }
    }
    return newData
}

function bitwiseXOROperator(img1,img2,width=WIDTH,height=HEIGHT){
    let newData =  new ImageData(width,height)
    for(let i=0;i<newData.height;i++){
        for(let j=0;j<newData.width;j++){
            newData.data[(i*newData.width+j)*4] = img1.data[(i*newData.width+j)*4] ^ img2.data[(i*newData.width+j)*4]
            newData.data[(i*newData.width+j)*4+1] = img1.data[(i*newData.width+j)*4+1] ^ img2.data[(i*newData.width+j)*4+1]
            newData.data[(i*newData.width+j)*4+2] = img1.data[(i*newData.width+j)*4+2] ^ img2.data[(i*newData.width+j)*4+2]
            newData.data[(i*newData.width+j)*4+3] = img1.data[(i*newData.width+j)*4+3] ^ img2.data[(i*newData.width+j)*4+3]
        }
    }
    return newData
}

export function bitwiseOr(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    blueScale(ctx)
    let c = document.createElement("canvas")
    c.width=width
    c.height=height
    const newCtx = c.getContext("2d")
    newCtx.putImageData(imageData,0,0)
    redScale(newCtx,c.width,c.height)
    ctx.putImageData(bitwiseOROperator(imageData,newCtx.getImageData(0,0,c.width,c.height)),0,0)
}

export function bitwiseAnd(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    let c = document.createElement("canvas")
    c.width=width
    c.height=height
    const newCtx = c.getContext("2d")
    newCtx.putImageData(imageData,0,0)
    ctx.putImageData(bitwiseANDOperator(imageData,newCtx.getImageData(0,0,c.width,c.height)),0,0)
}

export function bitwiseXor(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    let c = document.createElement("canvas")
    c.width=width
    c.height=height
    const newCtx = c.getContext("2d")
    newCtx.putImageData(imageData,0,0)
    ctx.putImageData(bitwiseXOROperator(imageData,newCtx.getImageData(0,0,c.width,c.height)),0,0)
}


export function cartoonize(ctx,width=WIDTH,height=HEIGHT){
    let imageData = ctx.getImageData(0,0,width,height)
    toGrayScale(ctx)
    let c = document.createElement("canvas")
    c.width=width
    c.height=height
    const newCtx = c.getContext("2d")
    newCtx.putImageData(imageData,0,0)
    sepia(newCtx,c.width,c.height)
    ctx.putImageData(bitwiseOROperator(imageData,newCtx.getImageData(0,0,c.width,c.height)),0,0)

    imageData = ctx.getImageData(0,0,width,height)
    toGrayScale(ctx)
    newCtx.putImageData(imageData,0,0)
    sepia(newCtx,c.width,c.height)
    ctx.putImageData(bitwiseANDOperator(imageData,newCtx.getImageData(0,0,c.width,c.height)),0,0)
}

export function sepia(ctx,width=WIDTH,height=HEIGHT){
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
  
      data[i] = Math.min(
        Math.round(0.393 * red + 0.769 * green + 0.189 * blue),
        255
      );
      data[i + 1] = Math.min(
        Math.round(0.349 * red + 0.686 * green + 0.168 * blue),
        255
      );
      data[i + 2] = Math.min(
        Math.round(0.272 * red + 0.534 * green + 0.131 * blue),
        255
      );
    }
    ctx.putImageData(imageData, 0, 0);
  };

