import React from "react";
import { deleteTip } from "../../store/tips/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { fetchAllLikes, addLike, deleteLike } from "../../store/likes/actions";
import { selectAllLikes } from "../../store/likes/selectors";
import { selectUser } from "../../store/user/selectors";
import { useLocation } from "react-router-dom";

export default function Tip({ data, placeId }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();

  const likes = useSelector(selectAllLikes);
  const likesArray = likes
    ? likes.map((l) => {
        return l.tipId;
      })
    : null;

  useEffect(() => {
    dispatch(fetchAllLikes());
  }, [dispatch]);

  return (
    <>
      {data.map((c) => {
        const likeNum = likesArray.filter((like) => {
          return like === c.id;
        });

        const profilePictureCheck = !c.userPhoto
          ? "http://res.cloudinary.com/dxtq8ajzg/image/upload/v1611749197/unqla8crrv5lzffchfnr.png"
          : c.userPhoto;

        const line =
          location.pathname !== "/Account" ? c.userName : c.placeName;
        return (
          <div key={c.id} class="py-4">
            <div class="p-4 bg-light rounded shadow-sm mb-3">
              <Row>
                {location.pathname !== "/Account" ? (
                  <Col>
                    <img
                      style={{
                        width: "100px",
                        borderRadius: "50%",
                        boxShadow: "1px 1px 10px 3px grey",
                      }}
                      alt="user"
                      src={profilePictureCheck}
                    />
                  </Col>
                ) : null}
                <Col>
                  <h6 class="font-weight-bold text-uppercase">{line}</h6>{" "}
                  <p class="font-weight-light">{c.text}</p>
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
                        {!user.id || location.pathname === "/Account" ? (
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
                </Col>
              </Row>
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
