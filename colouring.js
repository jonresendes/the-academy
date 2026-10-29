/* =========================================================
   colouring.js — line-art pictures for the Colouring Page game
   Each picture is an SVG whose fillable areas are elements with
   class="region". Keep black outlines (stroke) so areas are clear.
   You can add your own: paste any public-domain / CC0 line-art SVG,
   give each closed shape class="region", and register it with
   LearnHub.colouring['<courseId>/<unitId>'].push({ title, svg }).
   ========================================================= */
window.LearnHub = window.LearnHub || { courses: [] };
window.LearnHub.colouring = window.LearnHub.colouring || {};

(function () {
  const R = 'class="region" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"';
  const reg = (key, pic) => { (window.LearnHub.colouring[key] = window.LearnHub.colouring[key] || []).push(pic); };

  /* ---------- Science / Cells: a plant cell ---------- */
  reg('science/cells', { title: 'Plant cell', svg:
    '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">' +
    '<path ' + R + ' fill-rule="evenodd" d="M20 20h360v260H20z M44 44v212h312V44z"/>' +   // cell wall (ring)
    '<rect ' + R + ' x="44" y="44" width="312" height="212" rx="18"/>' +                   // cytoplasm
    '<ellipse ' + R + ' cx="250" cy="150" rx="78" ry="58"/>' +                             // vacuole
    '<circle ' + R + ' cx="120" cy="110" r="42"/>' +                                       // nucleus
    '<circle ' + R + ' cx="128" cy="104" r="12"/>' +                                       // nucleolus
    '<ellipse ' + R + ' cx="90" cy="205" rx="30" ry="16" transform="rotate(-20 90 205)"/>' + // chloroplast
    '<ellipse ' + R + ' cx="170" cy="225" rx="30" ry="16" transform="rotate(15 170 225)"/>' +
    '<ellipse ' + R + ' cx="300" cy="70" rx="30" ry="16" transform="rotate(-10 300 70)"/>' +
    '<ellipse ' + R + ' cx="210" cy="70" rx="22" ry="11" transform="rotate(30 210 70)"/>' + // mitochondria
    '<ellipse ' + R + ' cx="300" cy="235" rx="22" ry="11" transform="rotate(-25 300 235)"/>' +
    '</svg>' });

  /* ---------- Science / Cells: a microscope ---------- */
  reg('science/cells', { title: 'Microscope', svg:
    '<svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg">' +
    '<path ' + R + ' d="M40 300c0-20 30-30 110-30s110 10 110 30z"/>' +                   // base
    '<path ' + R + ' d="M120 270 L140 180 L180 180 L200 270z"/>' +                          // arm
    '<rect ' + R + ' x="60" y="190" width="120" height="16" rx="6"/>' +                    // stage
    '<rect ' + R + ' x="110" y="60" width="34" height="120" rx="8" transform="rotate(20 127 120)"/>' + // tube
    '<rect ' + R + ' x="120" y="36" width="44" height="28" rx="6" transform="rotate(20 142 50)"/>' +   // eyepiece
    '<rect ' + R + ' x="86" y="156" width="20" height="30" rx="5" transform="rotate(20 96 171)"/>' +   // lens
    '<circle ' + R + ' cx="230" cy="215" r="18"/>' +                                       // focus knob
    '<circle ' + R + ' cx="120" cy="240" r="16"/>' +                                       // mirror
    '</svg>' });

  /* ---------- Science / States of matter ---------- */
  reg('science/states-of-matter', { title: 'Ice, water and steam', svg:
    '<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg">' +
    '<rect ' + R + ' x="0" y="240" width="420" height="60"/>' +                            // table
    // ice cube (three faces)
    '<path ' + R + ' d="M30 130 L70 110 L130 120 L90 140z"/>' +
    '<path ' + R + ' d="M30 130 L90 140 L90 220 L30 210z"/>' +
    '<path ' + R + ' d="M90 140 L130 120 L130 200 L90 220z"/>' +
    // glass of water
    '<path ' + R + ' d="M170 120 L190 240 L270 240 L290 120z"/>' +                         // glass
    '<path ' + R + ' d="M176 160 L190 240 L270 240 L284 160z"/>' +                          // water
    // kettle with steam
    '<path ' + R + ' fill-rule="evenodd" d="M312 186 c-24 0 -24 40 0 40 v-10 c-12 0 -12 -20 0 -20z"/>' + // handle
    '<path ' + R + ' d="M320 170 h60 a10 10 0 0 1 10 10 v50 a10 10 0 0 1 -10 10 h-60 a10 10 0 0 1 -10 -10 v-50 a10 10 0 0 1 10 -10z"/>' +
    '<path ' + R + ' d="M330 170 c0-16 10-26 20-26s20 10 20 26z"/>' +                      // lid
    '<path ' + R + ' d="M390 185 l22 -12 v34 l-22 -8z"/>' +                                 // spout
    '<ellipse ' + R + ' cx="372" cy="118" rx="24" ry="14"/>' +                              // steam
    '<ellipse ' + R + ' cx="392" cy="88" rx="20" ry="13"/>' +
    '<ellipse ' + R + ' cx="366" cy="62" rx="16" ry="11"/>' +
    '</svg>' });

  /* ---------- English / Parts of speech: a scene ---------- */
  reg('english/parts-of-speech', { title: 'A sunny day', svg:
    '<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg">' +
    '<rect ' + R + ' x="0" y="0" width="420" height="220"/>' +                             // sky
    '<rect ' + R + ' x="0" y="220" width="420" height="80"/>' +                            // grass
    '<circle ' + R + ' cx="60" cy="60" r="34"/>' +                                         // sun
    '<path ' + R + ' d="M290 40 a22 22 0 0 1 40 -10 a20 20 0 0 1 36 12 a16 16 0 0 1 -6 30 h-80 a16 16 0 0 1 10 -32z"/>' + // cloud
    '<rect ' + R + ' x="120" y="140" width="130" height="80"/>' +                          // house wall
    '<path ' + R + ' d="M105 140 L185 80 L265 140z"/>' +                                   // roof
    '<rect ' + R + ' x="220" y="90" width="20" height="36"/>' +                            // chimney
    '<rect ' + R + ' x="170" y="170" width="30" height="50"/>' +                           // door
    '<rect ' + R + ' x="135" y="155" width="26" height="26"/>' +                           // window
    '<rect ' + R + ' x="210" y="155" width="26" height="26"/>' +
    '<rect ' + R + ' x="330" y="160" width="20" height="60"/>' +                           // trunk
    '<circle ' + R + ' cx="340" cy="130" r="42"/>' +                                       // canopy
    '<ellipse ' + R + ' cx="60" cy="250" rx="30" ry="14"/>' +                              // bush
    '<path ' + R + ' d="M280 250 c0-10 10-14 20-14 s20 4 20 14 l0 20 h-40z"/>' +           // dog body
    '<circle ' + R + ' cx="320" cy="245" r="10"/>' +                                       // dog head
    '</svg>' });

  /* ---------- English / Story elements: a castle ---------- */
  reg('english/story-elements', { title: 'Castle on a hill', svg:
    '<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg">' +
    '<rect ' + R + ' x="0" y="0" width="420" height="300"/>' +                             // sky
    '<path ' + R + ' d="M0 300 C100 200 320 200 420 300z"/>' +                             // hill
    '<circle ' + R + ' cx="350" cy="60" r="28"/>' +                                        // moon/sun
    '<rect ' + R + ' x="130" y="150" width="160" height="90"/>' +                          // keep
    '<path ' + R + ' d="M130 150 v-20 h20 v10 h20 v-10 h20 v10 h20 v-10 h20 v10 h20 v-10 h20 v10 h20 v-10 h20 v20z"/>' + // battlements
    '<rect ' + R + ' x="90" y="110" width="40" height="130"/>' +                           // left tower
    '<rect ' + R + ' x="290" y="110" width="40" height="130"/>' +                          // right tower
    '<path ' + R + ' d="M85 110 L110 70 L135 110z"/>' +                                    // left roof
    '<path ' + R + ' d="M285 110 L310 70 L335 110z"/>' +                                   // right roof
    '<path ' + R + ' d="M110 70 v-30 l24 8 l-24 8z"/>' +                                   // flag
    '<path ' + R + ' d="M310 70 v-30 l24 8 l-24 8z"/>' +
    '<path ' + R + ' d="M195 240 v-40 a15 15 0 0 1 30 0 v40z"/>' +                          // gate
    '<rect ' + R + ' x="160" y="175" width="18" height="24"/>' +                           // windows
    '<rect ' + R + ' x="242" y="175" width="18" height="24"/>' +
    '<path ' + R + ' d="M40 90 a18 18 0 0 1 34 -8 a16 16 0 0 1 30 10 a14 14 0 0 1 -6 26 h-64 a14 14 0 0 1 6 -28z"/>' + // cloud
    '</svg>' });
})();
