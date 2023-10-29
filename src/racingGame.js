import { MissionUtils } from "@woowacourse/mission-utils";
import { carGenerate } from "./car.js";

export async function userInputRound() {
  const roundNum = await MissionUtils.Console.readLineAsync(
    "시도할 횟수는 몇 회인가요?\n"
  );
  return roundNum;
}

export async function generateCars() {
  const carsList = await carGenerate();
  const randomCarsList = carsList.map((car) => ({
    carName: car,
    carDistance: "",
  }));
  return randomCarsList;
}

async function checkRandomNum(carList) {
  return carList.map((car) => {
    const randomNum = MissionUtils.Random.pickNumberInRange(0, 9);
    if (randomNum >= 4) {
      return { ...car, carDistance: car.carDistance + "-" };
    }
    return car;
  });
}

async function playRacing() {
  const round = await userInputRound();
  let carList = await generateCars();
  for (let i = 0; i < round; i++) {
    const roundResult = await checkRandomNum(carList);
    roundResult.forEach((car) => {
      console.log(`${car.carName} : ${car.carDistance}`);
    });
    console.log();
  }
}

playRacing();
