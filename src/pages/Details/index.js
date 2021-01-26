import React from "react";
import TipForm from "../../components/Tip/form";
import Tip from "../../components/Tip/tip";
import { useEffect } from "react";
import { fetchTipsForPlace } from "../../store/tips/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectTipsForPlace } from "../../store/tips/selectors";

export default function Details() {
  const dispatch = useDispatch();
  const data = useSelector(selectTipsForPlace);
  console.log(`i am inside of a component, from selector`, data);

  useEffect(() => {
    dispatch(fetchTipsForPlace(1));
  }, [dispatch]);
  return (
    <div>
      <h3>I am the details page</h3>
      {data
        ? data.map((tip) => {
            return <Tip key={tip.id} userName={tip.userName} text={tip.text} />;
          })
        : null}
      <TipForm />
    </div>
  );
}
