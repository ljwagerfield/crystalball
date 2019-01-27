package scrapbook

trait WithHelpers {
  def seriesSize: Int
  private def baseSeries = 0 until seriesSize

  def AR1(regression: Double => Double): List[Double] =
    baseSeries.foldLeft(List(1D))((accum, _) => accum :+ regression(accum.last))
}
