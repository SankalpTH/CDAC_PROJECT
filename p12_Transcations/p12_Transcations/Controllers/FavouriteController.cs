using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using p12_Transcations.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace p12_Transcations.Controllers
{
    [Route("basic/api/[controller]")]
    [EnableCors("AllowReactApp")]
    [ApiController]
    public class FavouriteController : ControllerBase
    {
        private readonly pg_explorerContext _context;

        public FavouriteController(pg_explorerContext context)
        {
            _context = context;
        }

        // ✅ Add PG to Favourites
        [HttpPost("AddPgToFavourite")]
        public async Task<IActionResult> AddPgToFavourite(int uid, int pgId)
        {
            if (_context.Favourites.Any(f => f.Uid == uid && f.PgId == pgId))
            {
                return BadRequest("PG is already in favourites");
            }

            var favourite = new Favourite
            {
                Uid = uid,
                PgId = pgId,
                MessId = null // Since this is a PG addition
            };

            _context.Favourites.Add(favourite);
            await _context.SaveChangesAsync();
            return Ok("PG added to favourites successfully");
        }

        // ✅ Add Mess to Favourites
        [HttpPost("AddMessToFavourite")]
        public async Task<IActionResult> AddMessToFavourite(int uid, int messId)
        {
            if (_context.Favourites.Any(f => f.Uid == uid && f.MessId == messId))
            {
                return BadRequest("Mess is already in favourites");
            }

            var favourite = new Favourite
            {
                Uid = uid,
                PgId = null, // Since this is a Mess addition
                MessId = messId
            };

            _context.Favourites.Add(favourite);
            await _context.SaveChangesAsync();
            return Ok("Mess added to favourites successfully");
        }

        // ✅ Get All PGs in Favourites for a User (Returns Full PG Objects)
        [HttpGet("GetFavouritePGs")]
        public IActionResult GetFavouritePGs(int uid)
        {
            var favouritePGs = _context.Favourites
                                       .Where(f => f.Uid == uid && f.PgId != null)
                                       .Include(f => f.Pg) // Ensure Pg details are included
                                       .Select(f => f.Pg)  // Get the full PG object
                                       .Where(pg => pg != null)
                                       .ToList();

            if (!favouritePGs.Any())
            {
                return NotFound("No PGs found in favourites.");
            }

            return Ok(favouritePGs);
        }

        // ✅ Get All Messes in Favourites for a User (Returns Full Mess Objects)
        [HttpGet("GetFavouriteMesses")]
        public IActionResult GetFavouriteMesses(int uid)
        {
            var favouriteMesses = _context.Favourites
                                          .Where(f => f.Uid == uid && f.MessId != null)
                                          .Include(f => f.Mess) // Ensure Mess details are included
                                          .Select(f => f.Mess)  // Get the full Mess object
                                          .Where(mess => mess != null)
                                          .ToList();

            if (!favouriteMesses.Any())
            {
                return NotFound("No Messes found in favourites.");
            }

            return Ok(favouriteMesses);
        }
    }
}
