"use client";
import { useEffect, useState } from "react";

//https://stackoverflow.com/a/68847097
const useSessionStorage = (name: string) => {
	const [value, setValue] = useState<string>("");

	useEffect(() => {
		var x = sessionStorage.getItem(name);
		if (x) {
			setValue(x);
		} else {
			setValue("");
		}
	}, []);

	return value;
};

export default useSessionStorage;
