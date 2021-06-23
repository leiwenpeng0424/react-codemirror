import { logException } from "@codemirror/view"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { ReactCodemirror } from "../../dist"

// `class`, `constant`, `enum`,
// `function`, `interface`, `keyword`, `method`,
// `namespace`, `property`, `text`, `type`, `variable`

const text = `
2021-06-23 00:14:58Starting Job Manager
2021-06-23 00:14:58Starting Task Manager
2021-06-23 00:16:59Starting taskexecutor as a console application on host t1402557236919664647-1623899917-2734406d-7-3-c7f47aff-tm-5kqvdp.
2021-06-23 00:17:022021-06-22 16:17:02,343 INFO org.apache.flink.runtime.taskexecutor.TaskManagerRunner - Preconfiguration:
2021-06-23 00:17:022021-06-22 16:17:02,341 INFO org.apache.flink.runtime.taskexecutor.TaskManagerRunner - --------------------------------------------------------------------------------
2021-06-23 00:17:022021-06-22 16:17:02,343 INFO org.apache.flink.runtime.taskexecutor.TaskManagerRunner -
2021-06-23 00:17:02
2021-06-23 00:17:02
2021-06-23 00:17:02 - Loading configuration property: jobmanager.rpc.port, 6123
2021-06-23 00:17:02 - Loading configuration property: taskmanager.numberOfTaskSlots, 32
2021-06-23 00:17:02 - Loading configuration property: jobmanager.execution.failover-strategy, region
2021-06-23 00:17:02 - Loading configuration property: blob.server.port, 6125
2021-06-23 00:17:02 - Loading configuration property: jobmanager.web.port, 8081
2021-06-23 00:17:02 - Loading configuration property: metrics.reporter.promgateway.deleteOnShutdown, true
2021-06-23 00:17:02 - Loading configuration property: metrics.reporter.promgateway.groupingKey, jobID=1402557236919664647;name=[天津武清]h3实时处理;roundID=1623899917;times=3;taskID=1395388948699676676;taskName=新车载优化h3流处理
2021-06-23 00:17:02 - Loading configuration property: metrics.reporter.promgateway.interval, 60 SECONDS
2021-06-23 00:17:02 - Loading configuration property: metrics.reporter.promgateway.jobName, [天津武清]h3实时处理
2021-06-23 00:17:02 - Loading configuration property: query.server.port, 6124
2021-06-23 00:17:02 - Loading configuration property: taskmanager.heap.size, 153600k
2021-06-23 00:17:02 - Loading configuration property: taskmanager.memory.flink.size, 844m
2021-06-23 00:17:02 - Loading configuration property: web.upload.dir, /opt/flink/
2021-06-23 00:17:02BASH_JAVA_UTILS_EXEC_RESULT:-Xmx308281339 -Xms308281339 -XX:MaxDirectMemorySize=222717543 -XX:MaxMetaspaceSize=268435456
2021-06-23 00:17:02TM_RESOURCES_DYNAMIC_CONFIGS extraction logs:
2021-06-23 00:17:02 - Loading configuration property: jobmanager.rpc.address, t1402557236919664647-1623899917-2734406d-7-3
2021-06-23 00:17:02 - Loading configuration property: taskmanager.memory.process.size, 1728m
2021-06-23 00:17:02 - Loading configuration property: query.server.port, 6125
2021-06-23 00:17:02 - Loading configuration property: blob.server.port, 6125
2021-06-23 00:17:02 - Loading configuration property: jobmanager.heap.size, 102400k
2021-06-23 00:17:02 - Loading configuration property: jobmanager.rpc.port, 6123
2021-06-23 00:17:02 - Loading configuration property: jobmanager.web.port, 8081`

const App: React.FC<Record<string | number, never>> = () => {
  const [t, setT] = React.useState(text)

  return (
    <ReactCodemirror
      value={t}
      language="log"
      style={{ height: 500, fontSize: 14 }}
      onScrollToBottom={() => {
        setT((t) => {
          return t + text
        })
      }}
    />
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
