import React from "react";
import { deleteTip } from "../../store/tips/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { fetchAllLikes, addLike, deleteLike } from "../../store/likes/actions";
import { selectAllLikes } from "../../store/likes/selectors";
import { selectUser } from "../../store/user/selectors";
import { useLocation } from "react-router-dom";

export default function Tip({ data, placeId }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  console.log(`userId`, location.pathname);
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
    <>
      {data.map((c) => {
        const likeNum = likesArray.filter((like) => {
          return like === c.id;
        });

        return (
          <div key={c.id} class="py-4">
            <div class="p-4 bg-light rounded shadow-sm mb-3">
              <h6 class="mb-3">{c.userName}</h6>
              <p class="font-italic mb-0">{c.text}</p>
              <ul class="list-inline small text-muted mt-3 mb-0">
                <li class="list-inline-item">
                  <i class="fa fa-heart-o mr-2"></i>{" "}
                  <span
                    style={{
                      backgroundColor: "white",
                      border: "none",
                      outline: "none",
                      fontSize: "20px",
                    }}
                    onClick={() => {
                      const smt = likes.find((like) => {
                        return like.tipId === c.id &&
                          like.userId === parseInt(user.id)
                          ? like
                          : null;
                      });

                      if (user.id === c.userId) {
                        console.log("you cant like your own tip"); //don't remove this console.log!!!
                      } else {
                        smt
                          ? dispatch(deleteLike(c.id))
                          : dispatch(addLike(c.id));
                      }
                    }}
                  >
                    {!user.id || user.id === c.userId ? (
                      <div>{likeNum.length} Likes</div>
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
                  </span>
                </li>
              </ul>{" "}
              {location.pathname === "/Account" ? (
                <Button
                  variant="danger"
                  style={{ margin: "20px" }}
                  onClick={() => {
                    dispatch(deleteTip(c.id, c.placeId));
                  }}
                >
                  delete tip
                </Button>
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
}
