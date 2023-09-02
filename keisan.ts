const speed = 5;
const LEFT = 0;
const RIGHT = 1;
const SEITEN = 0;
const HANTEN = 1;


const moterType = LEFT;
const direction = SEITEN;

const two_speed = (speed << 2).toString(2)
console.log("二進数",two_speed)
const data = (speed << 2) | (moterType << 1) | direction
// const data = `${String.fromCharCode(speed)}${String.fromCharCode(moterType)}${String.fromCharCode(direction)}`;
// const data = Buffer.from([speed << 2 | moterType << 1 | direction])

const data1 = data.toString()
console.log("data", data1)
// console.log("data_２進数", data.toString(2))

// const extractSpeed = (data >> 2) & 0b1111;
// console.log("extractSpeed",extractSpeed);

// const extractMoter = (data >> 1) & 0b1;
// console.log("extractMoter",extractMoter);

// const extractDirection = data & 0b1;
// console.log("extractDirection", extractDirection);
