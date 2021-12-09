const PubSub = () => {
  const sub = {};
  //  Publish an  Event
  const publish = (eventName, data) => {
    if (!sub.hasOwnProperty(eventName)) {
      return;
    }
    sub[eventName].forEach((callBack) => {
      callBack(data);
    });
  };
  //  Subsribe to a event
  const subscribe = (eventName, callBack) => {
    if (!sub.hasOwnProperty(eventName)) {
      sub[eventName] = [];
    }
    sub[eventName].push(callBack);
    const index = sub[eventName].length - 1;
    //  Return a method from subsribe to unsubscribe to the event at later time
    return () => {
      sub[eventName].splice(index, 1);
    };
  };
  return {
    publish,
    subscribe,
  };
};

// attaching the pub, sub to Object
const { publish, subscribe } = PubSub();
Object.prototype.publish = publish;
Object.prototype.subscribe = subscribe;

const obj = { name: "test" };

const unsubsribe = obj.subscribe("printName", (name) => {
  console.log(obj.name);
});

obj.publish("printName", obj.name);
unsubsribe();
obj.publish("printName", obj.name);
