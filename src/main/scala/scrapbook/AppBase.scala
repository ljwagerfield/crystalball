package scrapbook

import java.io.PrintWriter

abstract class AppBase extends App with WithHelpers {
  // TODO:
  // 1. Save data to new file (one file per chart name).
  // 2. Open 'Chart.tsx' and delete all occurences of 'loadXYZChartData()'.
  // 3. Prepend 'loadXYZChartData()' to top of 'Chart.tsx'
  def plot(chartName: String, series: List[Double]): Unit = {
    val sb = new StringBuilder
    sb.append("export const chartData = {\n")
    sb.append("  \"")
    sb.append(chartName)
    sb.append("\": {\n")
    sb.append("    \"description\": \"A simple bar chart with embedded data.\",\n")
    sb.append("    \"mark\": \"line\",\n")
    sb.append("    \"width\": 1350,\n")
    sb.append("    \"height\": 875,\n")
    sb.append("    \"encoding\": {\n")
    sb.append("      \"x\": {\"field\": \"x\", \"type\": \"quantitative\"},\n")
    sb.append("      \"y\": {\"field\": \"y\", \"type\": \"quantitative\"},\n")
    sb.append("    },\n")
    sb.append("    \"values\": [\n")

    series.zipWithIndex.foreach { case (value, index) =>
      sb.append("      {\"x\": ")
      sb.append(index)
      sb.append(", \"y\": ")
      sb.append(value)
      sb.append("},\n")
    }

    sb.append("    ]\n")
    sb.append("  }\n")
    sb.append("};\n")

    saveToFile(
      s"src/main/javascript/src/shared/state/domains/charts/Data.ts",
      sb.toString()
    )
  }

  def saveToFile(fileName: String, content: String): Unit = {
    val writer     = new PrintWriter(fileName)
    try {
      writer.write(content)
      writer.flush()
    }
    finally {
      writer.close()
    }
  }
}
