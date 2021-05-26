import * as React from "react"
import * as ReactDOM from "react-dom"
import { ReactCodemirror } from "../../dist/index"

// `class`, `constant`, `enum`,
// `function`, `interface`, `keyword`, `method`,
// `namespace`, `property`, `text`, `type`, `variable`

const App: React.FC<Record<string | number, never>> = () => {
  return (
    <ReactCodemirror
      language="sql"
      style={{ height: 500 }}
      value={`CREATE TABLE MySource(
  \`user_id\` BIGINT,
  \`name\` varchar,
  \`user_region\` TIMESTAMP(3)
) WITH (
  type ='kafka',
  bootstrapServers ='172.17.2.10:9092',
  offsetReset ='LATEST',
  groupID='fj-flink-sql',
  zookeeperQuorum ='172.17.2.10:2181',
  topic ='fj-flink-out-1',
  --- topic ='mqTest.*',
  ---topicIsPattern='true',
  parallelism = 1
);

INSERT INTO`}
      placeholder={[
        "Placeholder example1: SELECT * FROM AAA",
        "Placeholder example2: SELECT * FROM BBB",
        "Placeholder example3: SELECT * FROM CCC",
        "Placeholder example4: SELECT * FROM DDD",
        "Placeholder example5: SELECT * FROM EEE",
        "Placeholder example6: SELECT * FROM FFF",
      ]}
      formatter={(text: string) => text}
      langOptions={{
        upperCaseKeywords: true,
        schema: {
          aaa: [
            {
              label: "user_id",
              detail: "this is the user_id about the MySource",
            },
            {
              label: "name",
              detail: "this is the name about the MySource",
            },
            {
              label: "user_region",
              detail: "this is the user_region about the MySource",
            },
          ],
          bbb: [
            {
              label: "user_region",
              detail: "this is the user_region about the MySource",
            },
            {
              label: "pv",
              detail: "this is the pv about the MySource",
            },
            {
              label: "uv",
              detail: "this is the uv about the MySource",
            },
          ],
        },
      }}
    />
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
