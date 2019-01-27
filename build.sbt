val catsVersion       = "1.5.0"
val javaVersionString = "1.8"

name := "crystalball"

version := "0.0.1"

scalaVersion := "2.12.8"

scalacOptions := Seq("-target:jvm-" + javaVersionString, "-deprecation", "-feature", "-Ypartial-unification")

javacOptions ++= Seq("-source", javaVersionString, "-target", javaVersionString)

libraryDependencies ++= Seq(
  "org.typelevel" %% "cats-core"      % catsVersion,
  "org.typelevel" %% "cats-free"      % catsVersion,
  "org.typelevel" %% "alleycats-core" % catsVersion,
  "org.typelevel" %% "cats-effect"    % "1.0.0",
  "io.monix"      %% "monix"          % "3.0.0-RC2",
  "org.scalanlp"  %% "breeze"         % "0.13.2"
  //"org.platanios" % "tensorflow"      % "0.4.0" classifier "darwin-cpu-x86_64", // Todo: replace with custom-compiled TF binaries for performance (see: http://platanios.org/tensorflow_scala/installation.html)
)
