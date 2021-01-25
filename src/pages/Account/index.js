import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
export default function Account() {
  const user = useSelector(selectUser);
  console.log("User on Account Page!", user);

  useEffect(() => {
    console.log("Render");
  }, []);

  return (
    <div>
      <p>Hi there! {user.name}</p>
    </div>
  );
}
