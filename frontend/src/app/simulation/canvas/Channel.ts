import { Cell } from 'game-of-life-engine';
import { GameOfLifeConfig } from 'game-of-life-engine/build/main/lib/Configuration/game-of-life-config.type';

type EventsDefinition = {
  'paste-component': {
    name: 'paste-component';
    component: GameOfLifeConfig;
    position: Cell | 'mouse';
  };
  'copy-component': {
    name: 'copy-component';
    component: GameOfLifeConfig;
  };
  'save-as-component':{
    name: 'save-as-component',
    component: GameOfLifeConfig;
  }
};

type Events = (keyof EventsDefinition)[];
type ChannelEvent<T extends Events> = EventsDefinition[T[number]];

type EventHandler<T extends Events> = (e: ChannelEvent<T>) => void;
type Listener<T extends Events> = {
  callback: EventHandler<T>;
  targets: T;
};

export default class Channel {
  private listeners: Listener<Events>[] = [];

  public registerListener<T extends Events>(
    targets: T,
    callback: (e: ChannelEvent<T>) => void,
  ) {
    let cb = callback as EventHandler<Events>;

    this.listeners.push({
      callback: cb,
      targets,
    });
  }

  /** Diffuses event to all the listeners registered on the event type */
  public diffuse(event: ChannelEvent<Events>) {
    this.listeners.forEach((listener) => {
      // Call callback only if it was registered for the given event;

      if (listener.targets.includes(event.name)) {
        listener.callback(event);
      }
    });
  }
}
