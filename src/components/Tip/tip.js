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
            <button
              style={{
                backgroundColor: "white",
                border: "none",
                outline: "none",
                fontSize: "20px",
              }}
              onClick={() => {
                console.log("meow meow");

                console.log(`user id`, user.id);

                const smt = likes.find((like) => {
                  return like.tipId === c.id &&
                    like.userId === parseInt(user.id)
                    ? like
                    : null;
                });
                console.log(`whats going on even?`, smt);

                if (user.id === c.userId) {
                  console.log("you cant like your own tip");
                } else {
                  smt ? dispatch(deleteLike(c.id)) : dispatch(addLike(c.id));
                }
              }}
            >
              {!user.id || user.id === c.userId ? (
                <div>
                  <b style={{ fontSize: "20px" }}>❤</b>
                  {likeNum.length}
                </div>
              ) : likes.find((like) => {
                  return like.tipId === c.id &&
                    like.userId === parseInt(user.id)
                    ? like
                    : null;
                }) ? (
                <div>
                  <img
                    alt="like"
                    src="https://img.icons8.com/metro/26/000000/filled-like.png"
                  />
                  {likeNum.length}
                </div>
              ) : (
                <div>
                  <img
                    alt="like"
                    src="https://img.icons8.com/material-outlined/24/000000/filled-like.png"
                  />
                  {likeNum.length}
                </div>
              )}
            </button>
            {user.id ? (
              <Button
                variant="danger"
                style={{ margin: "20px" }}
                onClick={() => {
                  dispatch(deleteTip(c.id, placeId));
                }}
              >
                delete tip
              </Button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

//onclick check if likes.includes like with tip.id and user.id
//if true >>> dispatch removeLike
//if false >>> diaptch addLike
//<<img src="https://img.icons8.com/ios-filled/24/000000/filled-like.png"/>
