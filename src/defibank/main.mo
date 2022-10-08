import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor Dbank {
  stable var currentValue: Float = 300;
  currentValue:= 100;
  stable var startTime = Time.now();
  // Debug.print("hello");
  // Debug.print(debug_show(currentValue));

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withDraw(amount: Float) {
    let tempVal: Float = currentValue - amount;
    if(tempVal >= 0) {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("less than zero");
    }
  };

  public query func checkbalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsed = (currentTime - startTime) / 1000000000;
    currentValue:= currentValue * (1.01 ** Float.fromInt(timeElapsed));
    startTime:= currentTime; 
  };

}