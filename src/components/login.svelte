<script>
	import { IconMail } from '@tabler/icons-svelte';
</script>

<div class="h-full w-full bg-transparent flex flex-col justify-center items-center gap-10 p-4">
	<div>
		<h1 class="text-xl md:text-2xl font-semibold text-center">Log in / Sign up</h1>
		<p class="text-sm md:text-base text-center text-gray-500">
			for Latest trends, exciting offers!!
		</p>
	</div>
	<div class="w-full md:w-[60%] h-auto md:h-[75%] flex flex-col gap-5 mt-10">
		<span class="border rounded-md h-14 overflow-hidden border-gray-300 flex items-center">
			<span class="block w-10 text-center text-sm md:text-base">+91</span>
			<input
				type="text"
				class="w-full border-none focus:ring-0 text-base md:text-xl font-semibold"
				placeholder="Enter Mobile Number"
			/>
		</span>
		<button
			class="w-full h-14 rounded-md text-center bg-[#fdd835] text-gray-600 text-base md:text-xl"
		>
			CONTINUE
		</button>
		<div class="flex justify-center items-center h-fit w-full">
			<span class="block w-full border"></span>
			<span class="block w-20 text-center bg-white mx-auto text-gray-500">OR</span>
			<span class="block w-full border"></span>
		</div>
		<div class="w-full flex flex-col justify-center items-center gap-5">
			<button
				class="w-[85%] h-10 rounded-md text-center bg-transparent border-black border text-sm md:text-lg flex justify-center items-center gap-2"
			>
				<IconMail stroke="1" />
				Continue with Email
			</button>
			<span class="w-[85%] flex gap-2">
				<button
					class="w-[49%] h-10 rounded-md text-center bg-transparent border-black border text-sm md:text-lg flex justify-center items-center gap-2"
				>
					<img
						src="https://png2.cleanpng.com/sh/28bab917d6ec78d15355b255b71d1df8/L0KzQYm3U8I3N6F4iZH0aYP2gLBuTfdwd5hxfZ91b3fyPbi0kCVqfJYyf9H4Z3zoPbj8ggZiNZh0h9l1ZT3zfMb6TcViamlnTdQ6OETpdoq3TsQ5PWMASasBMUW1QoG8VMU4P2Y5TKo3cH7q/kisspng-google-logo-g-suite-google-guava-google-plus-5ab8b5b184ff90.4852919615220545775448.png"
						alt="google"
						class="w-6 h-6"
					/>
					Google
				</button>
				<button
					class="w-[49%] h-10 rounded-md text-center bg-transparent border-black border text-sm md:text-lg flex justify-center items-center gap-2"
				>
					<img
						src="https://png2.cleanpng.com/sh/387e3eb8f9fc249fd61c6c7a374dad49/L0KzQYm3VMA6N5h2iZH0aYP2gLBuTfZia5Znh9H0LXPyfcH8lPVzNZpoh9D8LYPyc7rojL1ubZVueZ91b3fyPb32hB8ubpJofdR4b3uwRbLqgsQ6OpY9fdNtNkCxRYi6UscyPmU2TaQ8Mke0SYm5Vcg1PF91htk=/kisspng-facebook-computer-icons-social-media-logo-logo-facebook-5acb492e8ead60.5732716415232719825844.png"
						alt="facebook"
						class="w-6 h-6"
					/>
					Facebook
				</button>
			</span>
		</div>
	</div>
</div>
