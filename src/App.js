import { useEffect, useState } from "react";

const App = () => {

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  const [single, setsingle] = useState(1);
  const [double, setdouble] = useState(0);
  const [triple, settriple] = useState(0);

  const [roomAllocationArray, setRoomAllocationArray] = useState([]);

  useEffect(() => {
    const dataset = {
      single: single,
      double: double,
      triple: triple
    }
    let object = Object.entries(dataset).flatMap(([roomType, count]) =>
      Array.from({ length: count }, (_, index) => ({ roomType, index: index + 1, adultCount: 0, childCount_CNB: 0, childCount_CWB: 0 }))
    );
    setRoomAllocationArray(object);
  }, [adultCount, childCount, single, double, triple]);

  const decrease = (value, data, roomIndex) => {
    let existingArr = [...roomAllocationArray];
    const index = existingArr.findIndex(room => room.roomType === data.roomType);
    if (index !== -1) {
      if (value === 'adult') {
        if (existingArr[roomIndex].adultCount > 0) {

          existingArr[roomIndex] = {
            ...existingArr[roomIndex],
            adultCount: Number(existingArr[roomIndex].adultCount) - 1
          };
        }
      } else {
        if (value === "childCWB") {
          if (existingArr[roomIndex].childCount_CWB > 0) {

            existingArr[roomIndex] = {
              ...existingArr[roomIndex],
              childCount_CWB: Number(existingArr[roomIndex].childCount_CWB) - 1
            };
          };
        } else {
          if (existingArr[roomIndex].childCount_CNB > 0) {
            existingArr[roomIndex] = {
              ...existingArr[roomIndex],
              childCount_CNB: Number(existingArr[roomIndex].childCount_CNB) - 1
            };
          };
        }
      }
      setRoomAllocationArray(existingArr);
    }
  }

  const increase = (value, data, roomIndex) => {
    let existingArr = [...roomAllocationArray];
    const index = existingArr.findIndex(room => room.roomType === data.roomType);
    if (index !== -1) {
      if (value === 'adult') {
        if (adultCount === existingArr[roomIndex].adultCount) {
          alert('you reach maximum limit')
        } else {
          existingArr[roomIndex] = {
            ...existingArr[roomIndex],
            adultCount: Number(existingArr[roomIndex].adultCount) + 1
          };
        }
      } else {
        if (value === "childCWB") {
          if (childCount === existingArr[roomIndex].childCount_CWB) {
            alert('you reach maximum limit')
          } else {
            existingArr[roomIndex] = {
              ...existingArr[roomIndex],
              childCount_CWB: Number(existingArr[roomIndex].childCount_CWB) + 1
            };
          }
        } else {
          if (childCount === existingArr[roomIndex].childCount_CNB) {
            alert('you reach maximum limit')
          } else {
            existingArr[roomIndex] = {
              ...existingArr[roomIndex],
              childCount_CNB: Number(existingArr[roomIndex].childCount_CNB) + 1
            };
          }
        }
      }
      setRoomAllocationArray(existingArr);
    }
  }

  const getRoomCondiionStatus = (room) => {
    let status = false;
    if (room.roomType == "single") {
      if (Number(room.adultCount) + Number(room.childCount_CWB) >= 1) {
        status = true
      }
    } else if (room.roomType == "double") {
      if (Number(room.adultCount) + Number(room.childCount_CWB) + Number(room.childCount_CNB / 2) >= 2) {
        status = true
      }
    } else if (room.roomType == "triple") {
      if (Number(room.adultCount) + Number(room.childCount_CWB / 1) + Number(room.childCount_CNB / 3) >= 3) {
        status = true
      }
    }
    return status
  }

  return (

    <div>

      <div className="col-10 m-5 d-flex align-items-center justify-content-center p-2 gap-3">

        <div className="d-flex col-4 flex-column align-items-start">
          <h6>adult</h6>
          <div className="d-flex border">
            <button className="btn btn-solid" onClick={() => setAdultCount(adultCount - 1)}>-</button>
            <input value={adultCount} disabled className="form-control border-0 rounded-0 m-2" />
            <button className="btn btn-solid" onClick={() => setAdultCount(adultCount + 1)}>+</button>
          </div>
        </div>

        <div className="d-flex col-4 flex-column align-items-start">
          <h6>child</h6>
          <div className="d-flex border">
            <button className="btn btn-solid" onClick={() => setChildCount(childCount - 1)}>-</button>
            <input value={childCount} disabled className="form-control border-0 rounded-0 m-2" />
            <button className="btn btn-solid" onClick={() => setChildCount(childCount + 1)}>+</button>
          </div>
        </div>

      </div>


      <div className="col-10 m-5 d-flex align-items-center justify-content-center p-2 gap-3">

        <div className="d-flex col-4 flex-column align-items-start">
          <h6>Single</h6>
          <div className="d-flex border">
            <button className="btn btn-solid" onClick={() => setsingle(single - 1)}>-</button>
            <input value={single} disabled className="form-control border-0 rounded-0 m-2" />
            <button className="btn btn-solid" onClick={() => setsingle(single + 1)}>+</button>
          </div>
        </div>

        <div className="d-flex col-4 flex-column align-items-start">
          <h6>double</h6>
          <div className="d-flex border">
            <button className="btn btn-solid" onClick={() => setdouble(double - 1)}>-</button>
            <input value={double} disabled className="form-control border-0 rounded-0 m-2" />
            <button className="btn btn-solid" onClick={() => setdouble(double + 1)}>+</button>
          </div>
        </div>

        <div className="d-flex col-4 flex-column align-items-start">
          <h6>triple</h6>
          <div className="d-flex border">
            <button className="btn btn-solid" onClick={() => settriple(triple - 1)}>-</button>
            <input value={triple} disabled className="form-control border-0 rounded-0 m-2" />
            <button className="btn btn-solid" onClick={() => settriple(triple + 1)}>+</button>
          </div>
        </div>

      </div>



      <div className="border col-10 mx-auto px-4 py-4">
        <h6>Room allocation</h6>
        {
          roomAllocationArray.map((room, roomIndex) => (
            <div key={roomIndex} lg="12" sm="12" md="12" >

              <h5 className='text-start m-0 p-0'> {(room.index)} {room.roomType} Room {getRoomCondiionStatus(room) ? 'reached' : 'okay'} </h5>

              <div className="d-flex">

                <div className="col-4  p-2">
                  <h6>Adult</h6>
                  <div className="d-flex border p-2 m-2">
                    <button className="btn btn-solid" disabled={getRoomCondiionStatus(room)} onClick={() => decrease('adult', room, roomIndex)}>-</button>
                    <input value={room.adultCount} disabled />
                    <button className="btn btn-solid" disabled={getRoomCondiionStatus(room)} onClick={() => increase('adult', room, roomIndex)}>+</button>
                  </div>
                </div>

                <div className="col-4  p-2">
                  <h6>Child with bed</h6>
                  <div className="d-flex border p-2 m-2">
                    <button className="btn btn-solid" disabled={getRoomCondiionStatus(room)} onClick={() => decrease('childCWB', room, roomIndex)}>-</button>
                    <input value={room.childCount_CWB} disabled />
                    <button className="btn btn-solid" disabled={getRoomCondiionStatus(room)} onClick={() => increase('childCWB', room, roomIndex)}>+</button>
                  </div>
                </div>

                <div className="col-4  p-2">
                  <h6>Child with no bed</h6>
                  <div className="d-flex border p-2 m-2">
                    <button className="btn btn-solid" disabled={getRoomCondiionStatus(room)} onClick={() => decrease('childCNB', room, roomIndex)}>-</button>
                    <input value={room.childCount_CNB} disabled />
                    <button className="btn btn-solid" disabled={getRoomCondiionStatus(room)} onClick={() => increase('childCNB', room, roomIndex)}>+</button>
                  </div>
                </div>

              </div>

            </div>
          ))
        }
      </div>

    </div>

  );

}

export default App;
