import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	products: [{ productId: {type: String}, quantity: {type: Number, default: 1} }],
	amount: { type: Number, required: true },
	address: { type: Object, required: true },
	status: { type: String, default: "Pending" }
}, { timestamps: true })

// export mongoose.model("User", OrderSchema)
export default mongoose.model('Order', OrderSchema);

// Christian say that all healings must be validated by modern medi-
// cine before they will consider them true. I am not fearful of modern
// medicine scrutinizing healings, but I am afraid of the mentality
// that sets science up as the standard by which Christian practice is
// judged. It is as though doctors are the new priestly caste; only they
// are qualified to validate religious experience.

// But I ask: Does the historical-critical method, especially as practiced in
// most seminaries, produce the kind of fruit that we are looking for? Is
// it pointing students (especially future leaders) toward a relationship
// with Jesus Christ? And is it strengthening that relationship? 
// Kingdom empowered and equipped leaders?

// Western conservative evangelical theological seminaries and
// graduate schools, can produce intellectual but not necessarily spiri-
// tual Christian leaders.
// Currently the primary criteria for admission to seminaries is
// academic achievement not a clear call, mature character, and gifting.
// giftedness for service, and empow-
// erment for Kingdom mission are concentric circles that God desires
// for His Church.

// We have much to be thankful for from the scientific method; because of it
// many foolish and hurtful ideas have been discarded (for example,
// false ideas about the races), and it has paved the way to scientific
// and technological discovery. But have we allowed it to invade our
// approach to Scripture study to the degree that it now controls our
// thinking, in many instances excluding from the realm of thinking
// and faith those things that should be a part of the Christian life?

// I also have questions about how the scientific method influences
// Christians’ practices. For example, I have heard more than one 
// Christian say that all healings must be validated by modern medi-
// cine before they will consider them true. I am not fearful of modern
// medicine scrutinizing healings, but I am afraid of the mentality
// that sets science up as the standard by which Christian practice is
// judged. It is as though doctors are the new priestly caste; only they
// are qualified to validate religious experience.

// Our skeptical responses to reports of signs and wonders show we are
// more affected by modern scientism than we want to admit.

// Certainly this is true of most colleges and uni-
// versities today, as Allan Bloom argues in his book, The Closing of the
// American Mind. To question modern scientific presuppositions is
// to commit heresy, which is one explanation for Christianity’s loss of
// stature in Western society over the past 50 years.

// Finally, the scientific method of Bible study tends to control
// areas of theological exploration. It does this in two ways. First, it
// eliminates some areas of investigation. Among many liberal Christians,
// topics like demons and healing are not worthy of serious consider-
// ation. They are ruled out as incompatible with a modern worldview.
// The issue here is plausibility; some subjects are acceptable within
// a scientific worldview, others are not. The latter are discarded, and
// anyone interested in studying them is labeled a “fundamentalist”
// (horrors!) and a narrow-minded person.

// The very atmosphere we breathe is saturated with sin.

// The purpose of power evangelism is
// to glorify God through demonstrations of divine power. But if the
// power of the enemy is underestimated, the opposite can occur.

// In order to wrestle with principalities and powers, one
// needs to wrestle with the flesh and blood of day-to-day Christian
// spirituality.

