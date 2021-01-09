//
export default (req, res) => {
  /*
  res.status(200).json({
    message: "Hello, API!",
    p1: "param1",
  });
  */
  var ret ={
    message: "Hello, API!",
    p1: "param1",
  }
  res.json(ret);
};