func();



function func() {
	console.log("fucntion dicloration");
}

console.log("New");

// ANSI-escape код для красного цвета
const redColor = "\x1b[31m";

// Сброс цвета (ANSI-escape код)
const resetColor = "\x1b[0m";

// Текст, который нужно вывести в красном цвете
const text = "Этот текст будет красным!";

// Выводим текст в красном цвете
console.log(redColor + text + resetColor);
{
	function convertTimeToDecimal(timeStr) {
		const [hours, minutes] = timeStr.split(":").map(Number);

		const decimalMinutes = minutes / 60;

		const result = hours + decimalMinutes;

		return result;
	}

	function checkActivity(startShift, endShift, startTime, endTime) {
		const firstFoundTimeShiftStart = convertTimeToDecimal(startTime);
		let firstFoundTimeShiftEnd = convertTimeToDecimal(endTime);
		if (firstFoundTimeShiftEnd < firstFoundTimeShiftStart) {
			firstFoundTimeShiftEnd += 24;
		}

		const secondFoundTimeShiftStart = firstFoundTimeShiftStart + 24;
		const secondFoundTimeShiftEnd = firstFoundTimeShiftEnd + 24;

		const therdFoundTimeShiftStart = firstFoundTimeShiftStart + 24 + 24;
		const therdFoundTimeShiftEnd = firstFoundTimeShiftEnd + 24 + 24;

		let userStartShift = convertTimeToDecimal(startShift) + 24;
		let userEndShift = convertTimeToDecimal(endShift) + 24;
		if (userEndShift < userStartShift) {
			userEndShift += 24;
		}

		let ishaveStendedTimeShiftFirst = userEndShift > firstFoundTimeShiftStart && userStartShift < firstFoundTimeShiftEnd;

		let ishaveStendedTimeShiftSecond = userEndShift > secondFoundTimeShiftStart && userStartShift < secondFoundTimeShiftEnd;

		let ishaveStendedTimeShiftTherd = userEndShift > therdFoundTimeShiftStart && userStartShift < therdFoundTimeShiftEnd;


		console.log(userEndShift, ">", firstFoundTimeShiftStart, userStartShift, "<", firstFoundTimeShiftEnd, ishaveStendedTimeShiftFirst);
		console.log(userEndShift, ">", secondFoundTimeShiftStart, userStartShift, "<", secondFoundTimeShiftEnd, ishaveStendedTimeShiftSecond);
		console.log(userEndShift, ">", therdFoundTimeShiftStart, userStartShift, "<", therdFoundTimeShiftEnd, ishaveStendedTimeShiftTherd);

		let dataShift = 0;

		if (ishaveStendedTimeShiftFirst) {
			let dataEndShift = userEndShift;
			if (userEndShift > firstFoundTimeShiftEnd) {
				dataEndShift = firstFoundTimeShiftEnd;
			}
			let dataStartShift = userStartShift;
			if (userStartShift < firstFoundTimeShiftStart) {
				dataStartShift = firstFoundTimeShiftStart;
			}
			dataShift = dataEndShift - dataStartShift;
		}

		if (ishaveStendedTimeShiftSecond) {
			let dataEndShift = userEndShift;
			if (userEndShift > secondFoundTimeShiftEnd) {
				dataEndShift = secondFoundTimeShiftEnd;
			}
			let dataStartShift = userStartShift;
			if (userStartShift < secondFoundTimeShiftStart) {
				dataStartShift = secondFoundTimeShiftStart;
			}
			dataShift += dataEndShift - dataStartShift;
		}

		if (ishaveStendedTimeShiftTherd) {
			let dataEndShift = userEndShift;
			if (userEndShift > therdFoundTimeShiftEnd) {
				dataEndShift = therdFoundTimeShiftEnd;
			}
			let dataStartShift = userStartShift;
			if (userStartShift < therdFoundTimeShiftStart) {
				dataStartShift = therdFoundTimeShiftStart;
			}
			dataShift += dataEndShift - dataStartShift;
		}

		return {
			currectShift: dataShift,
			ishaveStendedTimeShift: ishaveStendedTimeShiftFirst || ishaveStendedTimeShiftSecond || ishaveStendedTimeShiftTherd,
			FullShift: userEndShift - userStartShift,
			
		};
	}

	const tests = [
		{ startShift: "22:00", endShift: "06:00", startTime: "22:00", endTime: "06:00" },
		{ startShift: "23:00", endShift: "18:00", startTime: "13:00", endTime: "16:00" },
		{ startShift: "06:00", endShift: "18:00", startTime: "13:00", endTime: "16:00" },
		{ startShift: "22:00", endShift: "6:00", startTime: "14:00", endTime: "22:00" },
		{ startShift: "04:45", endShift: "13:45", startTime: "09:00", endTime: "08:00" },
		{ startShift: "14:45", endShift: "14:00", startTime: "08:00", endTime: "16:00" }
	];

	function getRandomTime() {
		const hours = Math.floor(Math.random() * 24);
		const minutes = Math.floor(Math.random() * 60);
		return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
	}

	for (let i = 0; i < 10; i++) {
		const startShift = getRandomTime();
		const endShift = getRandomTime();
		const startTime = getRandomTime();
		const endTime = getRandomTime();

		tests.push({ startShift, endShift, startTime, endTime });
	}

	tests.forEach((test, index) => {
		const result = checkActivity(test.startShift, test.endShift, test.startTime, test.endTime);
		console.log(`Test ${index + 1}: ${JSON.stringify(test)}, Result: ${JSON.stringify(result)}`);
	});
}
