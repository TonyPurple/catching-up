# catching-up

* When people code together on Replit, everyone's code needs to be in sync. You have to see the same code as I do even though we're typing on different computers. The challenge is making sure we don't end up with a jumbled mess of text while we type together.

	So in order to keep everyone's code in sync, Replit uses a method called <strong>Operational Transformations, or OT</strong>.

	Think about OT like this: when you type, you can either <i>insert</i> text, <i>delete</i> text, or <i>move</i> your cursor to a new position (this is called <i>skip</i> in OT land). These actions are called <strong>operations</strong>, and they <strong>transform</strong> your document! 

	More concretely, you can look at an Operational Transformation as a function that takes in a document, a position within that document (like where your cursor is), and then either modifies the document at that position or skips to a new position.</p>


	<strong>Some examples:</strong>
	</p>
	<ol>
		<!-- Example 1 -->
		<li class="example">
			<ul>
				<li>Input document: <code>""</code></li>
				<li>Starting cursor position: <code>0</code></li>
				<li>Operation: <code>{"op": "insert", "chars": "Hello, human!"}</code></li>
				<li>Output document: <code>"Hello, human!"</code></li>
				<li>Ending cursor position: <code>13</code></li>
			</ul>
		</li>
		<!-- Example 2 -->
		<li class="example">
			<ul>
				<li>Input document: <code>"What is up?"</code></li>
				<li>Starting cursor position: <code>7</code></li>
				<li>Operation: <code>{"op": "delete", "count": 3}</code></li>
				<li>Output document: <code>"What is?"</code></li>
				<li>Ending cursor position: <code>7</code></li>
			</ul>
		</li>
		
	<i class="note">Watch out: <code>delete</code> operations are applied forward while keeping the cursor in place. Crazy, we know.</i>

	<!-- Example 3 -->
	<li class="example">
			<ul>
				<li>Input document: <code>"Nice!"</code></li>
				<li>Starting cursor position: <code>0</code></li>
				<li>Operation (1): <code>{"op": "skip", "count": 4}</code></li>
				<li>Operation (2): <code>{"op": "insert", "chars": " day"}</code></li>
				<li>Output document: <code>"Nice day!"</code></li>
				<li>Ending cursor position: <code>8</code></li>
			</ul>
	</li>
	
	<i class="note">As you can see, this last example applies two transformations in a row.</i>
</ol>

<h2>What we want you to do</h2>
<p>Back to keeping everyone in a multiplayer repl in sync. In the real world, we don't always work at the same time. Sometimes people leave then rejoin later, or lose their internet connection and come back online. When people rejoin, we need their client to <strong>"catch up"</strong> to the current state of the repl so everyone has the same code in front of them!

<p>So when we catch up, we need to validate that a sequence of operational transformations will actually produce the most recent version of your code. It would be pretty terrible if I edited your file while you're gone, then you somehow end up with the wrong file contents when you rejoin later 😢</p>
	
<p><strong>For this challenge, you're going to write the OT validation function.</strong> The function will take in a string for the stale file contents, a string containing the latest file contents, and a JSON string containing the operations.</p>

<h4>Gotchas:</h4>
<ul>
	<li>You can't skip past the end of a string</li>
	<li>You can't delete past the end of a string</li>
	<li>Delete operations are applied forward while keeping the cursor in place</li>
</ul>

<p>You may use any language! Please choose a language you are comfortable coding in quickly. Here are some examples in JavaScript:</p>

<pre><code>function isValid(stale, latest, otjson) {
  // this is the part you will write!
}

isValid(
  &#39;Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.&#39;,
  &#39;Repl.it uses operational transformations.&#39;,
  &#39;[{&quot;op&quot;: &quot;skip&quot;, &quot;count&quot;: 40}, {&quot;op&quot;: &quot;delete&quot;, &quot;count&quot;: 47}]&#39;
); // true

isValid(
  &#39;Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.&#39;,
  &#39;Repl.it uses operational transformations.&#39;,
  &#39;[{&quot;op&quot;: &quot;skip&quot;, &quot;count&quot;: 45}, {&quot;op&quot;: &quot;delete&quot;, &quot;count&quot;: 47}]&#39;
); // false, delete past end

isValid(
  &#39;Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.&#39;,
  &#39;Repl.it uses operational transformations.&#39;,
  &#39;[{&quot;op&quot;: &quot;skip&quot;, &quot;count&quot;: 40}, {&quot;op&quot;: &quot;delete&quot;, &quot;count&quot;: 47}, {&quot;op&quot;: &quot;skip&quot;, &quot;count&quot;: 2}]&#39;
); // false, skip past end

isValid(
  &#39;Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.&#39;,
  &#39;We use operational transformations to keep everyone in a multiplayer repl in sync.&#39;,
  &#39;[{&quot;op&quot;: &quot;delete&quot;, &quot;count&quot;: 7}, {&quot;op&quot;: &quot;insert&quot;, &quot;chars&quot;: &quot;We&quot;}, {&quot;op&quot;: &quot;skip&quot;, &quot;count&quot;: 4}, {&quot;op&quot;: &quot;delete&quot;, &quot;count&quot;: 1}]&#39;
); // true

isValid(
  &#39;Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.&#39;,
  &#39;Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.&#39;,
  &#39;[]&#39;
); // true</code></pre>
