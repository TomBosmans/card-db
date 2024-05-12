// import fetchAshesRebornCards from "./ashesReborn/fetchAshesRebornCards"
// import fetchAshesRebornImages from "./ashesReborn/fetchAshesRebornImages"
// import insertAshesRebornCards from "./ashesReborn/insertAshesRebornCards"
// import fetchArkhamCards from "./arkhamTCG/fetchArkhamCards"
// import fetchArkhamImages from "./arkhamTCG/fetchArkhamImages"
import insertArkhamCards from "./arkhamTCG/insertArkhamCards"

async function run() {
  // await fetchAshesRebornCards()
  // await fetchAshesRebornImages()
  // await insertAshesRebornCards()
  // await fetchArkhamCards()
  // await fetchArkhamImages()
  await insertArkhamCards()
  console.log("well hello there!")
}

void run()
