"use client";

import Image from "next/image";
import { BINS_DATA } from "./utils/config.js";
import {
  calculatePlannedCollectionDate,
  calculateCollectionSchedule,
  calculateAdjustedCollectionDate,
} from "./utils/helpers.js";

import { useEffect, useState } from "react";

export default function Home() {
  const [todayDate, setTodayDate] = useState(new Date());
  const plannedCollectionDate = calculatePlannedCollectionDate(todayDate);

  const [adjustedCollectionDate, setAdjustedCollectionDate] = useState(
    plannedCollectionDate
  );

  const collectionScheduleWeek = calculateCollectionSchedule(
    plannedCollectionDate
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTodayDate(new Date());
      console.log("This will run every 10 minutes!");
    }, 1000 * 60 * 10);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const nextCollectionDate = await calculateAdjustedCollectionDate(
        todayDate,
        calculatePlannedCollectionDate(todayDate)
      );
      setAdjustedCollectionDate(nextCollectionDate); // calendar date with day shift
    };

    fetchData();
  }, [todayDate]);

  return (
    <main>
      <div className="container">
        <h3>Today&apos;s date: {todayDate.toDateString()}</h3>
        <h3>Next collection: {adjustedCollectionDate.toDateString()}</h3>
        <div className="line"></div>
        <Bins weekSchedule={collectionScheduleWeek} />
        <div className="line"></div>
      </div>
    </main>
  );
}

function Bins({ weekSchedule }) {
  const binsList = BINS_DATA.filter(({ name, _ }) =>
    weekSchedule.includes(name)
  ).map(({ name, url }) => (
    <div key={url}>
      <Bin name={name} url={url} />
    </div>
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
