import Image from "next/image";
import { BINS_DATA } from "./utils/config.js";
import {
  calculateNextCollectionDate,
  calculateCollectionSchedule,
} from "./utils/helpers.js";
import { useEffect, useState } from "react";

export default function Home() {
  const [todayDate, setTodayDate] = useState(new Date());
  const [dayShift, setDayShift] = useState(0);

  const nextCollectionDate = calculateNextCollectionDate(todayDate);

  const collectionScheduleWeek =
    calculateCollectionSchedule(nextCollectionDate);

  useEffect(() => {
    const timer = setInterval(() => {
      setTodayDate(new Date());
      console.log("This will run every 10 minutes!");
    }, 1000 * 60 * 10);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    //setDayShift(await calculateDayShift())
    const fetchData = async () => {
      //const x = await calculate();
      setDayShift(await calculateDayShift());
    };

    fetchData();
    //hello ue
  }, [todayDate]);

  async function calculateDayShift() {
    // check localStorage, if empty or invalid
    // await fetch holidays
    // then store in localStorage holidays: { year: 2023, days: [] }
    // calculate day shift
    return 1;
  }

  console.log(calculateDayShift()); // 1

  return (
    <main>
      <div className="container">
        <h3>Today&apos;s date: {todayDate.toDateString()}</h3>
        <h3>Next collection date: {nextCollectionDate.toDateString()}</h3>
        <div className="line"></div>
        <Bins weekSchedule={collectionScheduleWeek} />
      </div>
    </main>
  );
}

function Bins({ weekSchedule }) {
  const binsList = BINS_DATA.filter(({ name, _ }) =>
    weekSchedule.includes(name)
  ).map(({ name, url }) => (
    <>
      <Bin name={name} url={url} key={url} />
      <div className="line line--thin"></div>
    </>
  ));
  return <div className="bins">{binsList}</div>;
}

function Bin({ name, url }) {
  return (
    <div className="bin">
      <Image src={url} alt={name} width={150} height={150} />
      <span>{name}</span>
    </div>
  );
}
