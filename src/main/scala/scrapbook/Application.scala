package scrapbook

import scala.util.Random

object Application extends AppBase {
  val seriesSize = 1000

  plot(
    chartName = "Random Walk (Multiplicative)",
    series    = AR1(x => (1 * x) * (1D + ((Random.nextDouble() * 0.06D) - 0.03D)))
  )

  plot(
    chartName = "Random Walk (Additive)",
    series    = AR1(x => (0.9 * x) + (0D + ((Random.nextDouble() * 0.06D) - 0.03D)))
  )
}
