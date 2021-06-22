#Schumann_Vic-Fabienne__Kopp_Alexandra
data1 <- read.csv('/home/alexandra/git/SciVis_SS2021/assignment5/A5_exercise_3.2_data/Data1.csv', sep = ";")
data2 <- read.csv('/home/alexandra/git/SciVis_SS2021/assignment5/A5_exercise_3.2_data/Data2.csv', sep = ";")
data3 <- read.csv('/home/alexandra/git/SciVis_SS2021/assignment5/A5_exercise_3.2_data/Data3.csv', sep = ";")
data4 <- read.csv('/home/alexandra/git/SciVis_SS2021/assignment5/A5_exercise_3.2_data/Data4.csv', sep = ";")

dataSets <- c(data1, data2, data3, data4)

for (i in 1:4) {
  dx <- dataSets[[i*2 -1]]
  dy <- dataSets[[i*2]]
  
  m <- mean(dy)
  v <- var(dy)
  c <- cor(dx,dy,method="spearman")
  
  cat(paste0("Statistical properties from data ", i,":\n",
             "Mean: ", m, "\n",
             "Variance: ", v, "\n",
             "Correlation: ", c, "\n\n"))
  
  plot(dx,dy, col='blue', pch=19, main=paste0("Data ", i))
  abline(lm(dy~dx), col='red')
  }