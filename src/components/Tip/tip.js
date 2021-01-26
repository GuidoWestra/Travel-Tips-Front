import React from "react";
import { deleteTip } from "../../store/tips/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { fetchAllLikes } from "../../store/likes/actions";
import { selectAllLikes } from "../../store/likes/selectors";

export default function Tip({ data, placeId }) {
  const dispatch = useDispatch();
  const like = 0; //hardcode it for now
  const likes = useSelector(selectAllLikes);
  const likesArray = likes
    ? likes.map((l) => {
        return l.tipId;
      })
    : null;
  if (likesArray) console.log(`list of tipId`, likesArray);

  useEffect(() => {
    dispatch(fetchAllLikes());
  }, [dispatch]);
  return (
    <div>
      <h4> all tips</h4>
      {data.map((c) => {
        const likeNum = likesArray.filter((like) => {
          return like === c.id;
        });
        console.log(likeNum);
        return (
          <div
            style={{
              margin: "20px",
              padding: "15px",
              border: "1px solid black",
            }}
            key={c.id}
          >
            <h5>{c.userName}</h5>
            <p>{c.text}</p>
            <span style={{ fontSize: "20px" }}>♡ {likeNum.length}</span>
            <Button
              variant="danger"
              style={{ margin: "20px" }}
              onClick={() => {
                dispatch(deleteTip(c.id, placeId));
              }}
            >
              delete tip
            </Button>{" "}
          </div>
        );
      })}
    </div>
  );
}
