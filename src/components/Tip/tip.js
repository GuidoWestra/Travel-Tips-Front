import React from "react";
import { deleteTip } from "../../store/tips/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { fetchAllLikes, addLike, deleteLike } from "../../store/likes/actions";
import { selectAllLikes } from "../../store/likes/selectors";
import { selectUser } from "../../store/user/selectors";

export default function Tip({ data, placeId }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(`userId`, user.id);
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
            <Button
              onClick={() => {
                console.log("meow meow");
                // dispatch(addLike(c.id));
                console.log(c.id);

                const smt = likes.find((like) => {
                  return like.tipId === c.id &&
                    like.userId === parseInt(user.id)
                    ? like
                    : null;
                });
                console.log(`whats going on even?`, smt);
                smt ? dispatch(deleteLike(c.id)) : dispatch(addLike(c.id));
              }}
              variant="info"
              style={{ fontSize: "20px" }}
            >
              {likes.find((like) => {
                return like.tipId === c.id && like.userId === parseInt(user.id)
                  ? like
                  : null;
              })
                ? "♥"
                : "♡"}{" "}
              {likeNum.length}
            </Button>
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

//onclick check if likes.includes like with tip.id and user.id
//if true >>> dispatch removeLike
//if false >>> diaptch addLike
