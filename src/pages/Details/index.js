import React from "react";
import TipForm from "../../components/Tip/form";
import Tip from "../../components/Tip/tip";
import { useEffect } from "react";
import { fetchTipsForPlace } from "../../store/tips/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectTipsForPlace } from "../../store/tips/selectors";
import { useParams } from "react-router-dom";

export default function Details() {
  const dispatch = useDispatch();
  const data = useSelector(selectTipsForPlace);
  console.log(`i am inside of a component, from selector`, data);

  const sortedTips = [...data].sort((a, b) => {
    return b.id - a.id;
  });
  const place = useParams();
  const placeId = place.id; //should come from a route
  useEffect(() => {
    dispatch(fetchTipsForPlace(placeId));
  }, [dispatch]);
  return (
    <div>
      <h3>I am the details page</h3>
      <TipForm placeId={placeId} />
      {sortedTips
        ? sortedTips.map((tip) => {
            return (
              <Tip
                key={tip.id}
                userName={tip.userName}
                text={tip.text}
                id={tip.id}
                placeId={placeId}
              />
            );
          })
        : null}
    </div>
  );
}
