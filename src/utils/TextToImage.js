const randomHex = () => {
  const randomNum = () => Math.round(Math.random()*255).toString(16).padStart(2, 0)
  return `#${randomNum()}${randomNum()}${randomNum()}`
}

const reverseHex = (hex) =>  {
  if (!(/^#[0-9a-fA-F]{3}$/.test(hex)) && !(/^#[0-9a-fA-F]{6}$/.test(hex))) {
    throw new Error('invalid color')
  }
  hex = hex.slice(1)
  let str1
  let str2
  let str3
  if (hex.length === 3) {
    str1 = String(hex[0]) + hex[0]
    str2 = String(hex[1]) + hex[1]
    str3 = String(hex[2]) + hex[2]
  } else if (hex.length === 6) {
    str1 = hex.slice(0, 2)
    str2 = hex.slice(2, 4)
    str3 = hex.slice(4)
  }
  str1 = 255 - parseInt(str1, 16)
  str2 = 255 - parseInt(str2, 16)
  str3 = 255 - parseInt(str3, 16)
  return `#${str1.toString(16).padStart(2, 0)}${str2.toString(16).padStart(2,0)}${str3.toString(16).padStart(2,0)}`
};

const randomArrayName = (array) => {
  let num = Math.round(Math.random() * array.length)
  return array[num]
}

const backgroundColor = {
  Berimbolo: '#037BB5',
  Vanusa: '#89216B',
  Shadowgrey: '#8c8c8c',
  SlightOceanView: '#a8c0ff',
  SandToBlue: '#DECBA4',
  Lawrencium: '#302b63',
  Ohhappiness: '#00b09b',
  Delicate: '#D3CCE3',
  Velvet: '#e1eec3',
  DigitalWater: '#74ebd5',
  Warm: '#ACB6E5',
  Lithium: '#D3CBB8',
  Hydrogen: '#0082c8',
  Dull: '#C9D6FF'
}
const colors = ['Berimbolo','Vanusa', 'Shadowgrey', 'SlightOceanView', 'SandToBlue','Lawrencium', 'Ohhappiness', 'Delicate', 'Velvet', 'DigitalWater', 'Warm', 'Lithium', 'Hydrogen', 'Dull']

export default function textToImage(name){
        //设置初始值,防止name为空时程序无法执行
        var nick = (name || 'Null').charAt(0).toUpperCase();
        var fontSize = 30;
        var fontWeight = 500;
        var canvas = document.createElement('canvas')
        canvas.setAttribute('width', 60)
        canvas.setAttribute('height', 60)
        var context = canvas.getContext('2d');
        //头像背景颜色设置
        const color = backgroundColor[randomArrayName(colors)]
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        //头像字体颜色设置
        context.fillStyle = '#FFF';
        context.font = fontWeight + ' ' + fontSize + 'px sans-serif';
        context.textAlign = 'center';
        context.textBaseline="middle";
        context.fillText(nick, fontSize, fontSize);
        const url = canvas.toDataURL("image/png");

        return url
}
