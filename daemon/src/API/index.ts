import { v4 } from "uuid";

interface WorkerCommand {
  cmd: any;
  data?: any;
  uuid: string;
  err?: any;
}

const channelWorkerListenName = "toMainWorker";

export const _postMessage = (
  cmd: WorkerCommand,
  close: boolean,
  resolve: any,
  Callback?: (err: string, data: any[]) => void
) => {
  const channel = new BroadcastChannel(channelWorkerListenName);

  const kk = (e: any) => {
    listeningChannel(e.data, cmd.uuid);
  };

  const listenChannel = cmd.uuid ? new BroadcastChannel(cmd.uuid) : null;

  const listeningChannel = (data: any, uuid: string) => {
    let cmd: WorkerCommand;

    try {
      cmd = JSON.parse(data);
    } catch (ex) {
      return console.log(
        "class CONET_Platfrom_API",
        `listeningChannel JSON.parse(data) Error`
      );
    }

    if (close && listenChannel) {
      listenChannel.close();
    }

    if (cmd.err) {
      if (resolve) {
        return resolve([cmd.err, cmd.data]);
      }

      if (Callback) {
        return Callback(cmd.err, [cmd.data]);
      }

      return console.log(`postMessage Callback && resolve all null`, cmd.err);
    }

    if (resolve) {
      return resolve(["SUCCESS", cmd.data]);
    }

    if (Callback) {
      if (!cmd.data.length) {
        if (listenChannel) {
          listenChannel.close();
        }

        return Callback("", []);
      }

      return Callback("", cmd.data);
    }

    return console.log(`postMessage Callback && resolve all null`, cmd.data);
  };

  if (listenChannel) {
    listenChannel.addEventListener("message", kk);
  }

  channel.postMessage(JSON.stringify(cmd));
  channel.close();
};

export const getAllRegions: () => Promise<string> = () =>
  new Promise((resolve) => {
    const cmd: WorkerCommand = {
      cmd: "getAllRegions",
      uuid: v4(),
      data: [],
    };
    return _postMessage(cmd, true, resolve);
  });
